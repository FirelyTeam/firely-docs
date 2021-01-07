Search.query = function(query) {
  var i;

  // stem the searchterms and add them to the correct list
  var stemmer = new Stemmer();
  var searchterms = [];
  var excluded = [];
  var hlterms = [];
  var tmp = splitQuery(query);
  var objectterms = [];
  for (i = 0; i < tmp.length; i++) {
    if (tmp[i] !== "") {
        objectterms.push(tmp[i].toLowerCase());
    }

    if ($u.indexOf(stopwords, tmp[i].toLowerCase()) != -1 || tmp[i] === "") {
      // skip this "word"
      continue;
    }
    // stem the word
    var word = stemmer.stemWord(tmp[i].toLowerCase());
    // prevent stemmer from cutting word smaller than two chars
    if(word.length < 3 && tmp[i].length >= 3) {
      word = tmp[i];
    }
    var toAppend;
    // select the correct list
    if (word[0] == '-') {
      toAppend = excluded;
      word = word.substr(1);
    }
    else {
      toAppend = searchterms;
      hlterms.push(tmp[i].toLowerCase());
    }
    // only add if not already in the list
    if (!$u.contains(toAppend, word))
      toAppend.push(word);
  }
  var highlightstring = '?highlight=' + $.urlencode(hlterms.join(" "));

  // console.debug('SEARCH: searching for:');
  // console.info('required: ', searchterms);
  // console.info('excluded: ', excluded);

  // prepare search
  var terms = this._index.terms;
  var titleterms = this._index.titleterms;

  // array of [filename, title, anchor, descr, score]
  var results = [];
  $('#search-progress').empty();

  // lookup as object
  for (i = 0; i < objectterms.length; i++) {
    var others = [].concat(objectterms.slice(0, i),
                            objectterms.slice(i+1, objectterms.length));
    results = results.concat(this.performObjectSearch(objectterms[i], others));
  }

  // lookup as search terms in fulltext
  results = results.concat(this.performTermsSearch(searchterms, excluded, terms, titleterms));

  // let the scorer override scores with a custom scoring function
  if (Scorer.score) {
    for (i = 0; i < results.length; i++)
      results[i][4] = Scorer.score(results[i]);
  }

  // now sort the results by score (in opposite order of appearance, since the
  // display function below uses pop() to retrieve items) and then
  // alphabetically
  results.sort(function(a, b) {
    var left = a[4];
    var right = b[4];
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      // same score: sort alphabetically
      left = a[1].toLowerCase();
      right = b[1].toLowerCase();
      return (left > right) ? -1 : ((left < right) ? 1 : 0);
    }
  });

  // for debugging
  //Search.lastresults = results.slice();  // a copy
  //console.info('search results:', Search.lastresults);

  // print the results
  var resultCount = results.length;
  function displayNextItem() {
    // results left, load the summary and display it
    if (results.length) {
      var item = results.pop();
      var listItem = $('<li style="display:none"></li>');
      var requestUrl = "";
      var linkUrl = "";
      if (DOCUMENTATION_OPTIONS.BUILDER === 'dirhtml') {
        // dirhtml builder
        var dirname = item[0] + '/';
        if (dirname.match(/\/index\/$/)) {
          dirname = dirname.substring(0, dirname.length-6);
        } else if (dirname == 'index/') {
          dirname = '';
        }
        requestUrl = DOCUMENTATION_OPTIONS.URL_ROOT + dirname;
        linkUrl = requestUrl;

      } else {
        // normal html builders
        requestUrl = DOCUMENTATION_OPTIONS.URL_ROOT + item[0] + DOCUMENTATION_OPTIONS.FILE_SUFFIX;
        linkUrl = item[0] + DOCUMENTATION_OPTIONS.LINK_SUFFIX;
      }

      // EDITS FIRELY START
      // Based on https://github.com/sphinx-doc/sphinx/blob/master/sphinx/themes/basic/static/searchtools.js

      var searchTitle = '';

      if (linkUrl.startsWith('simplifier/')) {
        searchTitle += 'Simplifier&nbsp;&raquo;&nbsp;'
      } else if (linkUrl.startsWith('forge/')) {
        searchTitle += 'Forge&nbsp;&raquo;&nbsp;'
      } else if (linkUrl.startsWith('vonk/')) {
        searchTitle += 'Vonk&nbsp;&raquo;&nbsp;'
      } else if (linkUrl.startsWith('firelynetsdk/')) {
        searchTitle += 'Firely .NET SDK&nbsp;&raquo;&nbsp;'
      } else if (linkUrl.startsWith('firelyterminal/')) {
        searchTitle += 'Firely Terminal&nbsp;&raquo;&nbsp;'
      } else if (linkUrl.startsWith('mappingengine/')) {
        searchTitle += 'Mapping Engine&nbsp;&raquo;&nbsp;'
      } else if (linkUrl.startsWith('vonkloader/')) {
        searchTitle += 'Vonk Loader&nbsp;&raquo;&nbsp;'
      }
      searchTitle += '<strong>'+item[1]+'</strong>';

      listItem.append($('<a/>').attr('href',
          linkUrl +
          highlightstring + item[2]).html(searchTitle));

      // EDITS FIRELY END
      
      if (item[3]) {
        listItem.append($('<span> (' + item[3] + ')</span>'));
        Search.output.append(listItem);
        listItem.slideDown(5, function() {
          displayNextItem();
        });
      } else if (DOCUMENTATION_OPTIONS.HAS_SOURCE) {
        $.ajax({url: requestUrl,
                dataType: "text",
                complete: function(jqxhr, textstatus) {
                  var data = jqxhr.responseText;
                  if (data !== '' && data !== undefined) {
                    listItem.append(Search.makeSearchSummary(data, searchterms, hlterms));
                  }
                  Search.output.append(listItem);
                  listItem.slideDown(5, function() {
                    displayNextItem();
                  });
                }});
      } else {
        // no source available, just display title
        Search.output.append(listItem);
        listItem.slideDown(5, function() {
          displayNextItem();
        });
      }
    }
    // search finished, update title and status message
    else {
      Search.stopPulse();
      Search.title.text(_('Search Results'));
      if (!resultCount)
        Search.status.text(_('Your search did not match any documents. Please make sure that all words are spelled correctly and that you\'ve selected enough categories.'));
      else
          Search.status.text(_('Search finished, found %s page(s) matching the search query.').replace('%s', resultCount));
      Search.status.fadeIn(500);
    }
  }
  displayNextItem();
}