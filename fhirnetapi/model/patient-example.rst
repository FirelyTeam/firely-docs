	
Code example for Patient
------------------------
With the code examples from the previous paragraphs, plus some additions, we have constructed a code
example that sets up an instance of the Patient resource, with some information covering all of the
topics of this section. We have tried to include different ways to fill in the fields, so you can
see the possibilities and choose what suits your programming style best.

.. code-block:: csharp

	// example Patient setup, fictional data only
	var pat = new Patient();

	var id = new Identifier();
	id.System = "http://hl7.org/fhir/sid/us-ssn";
	id.Value = "000-12-3456";
	pat.Identifier.Add(id);
	
	var name =  new HumanName().WithGiven("Christopher").WithGiven("C.H.").AndFamily("Parks");
	name.Prefix = new string[] { "Mr." };
	name.Use = HumanName.NameUse.Official;
	
	var nickname = new HumanName();
	nickname.Use = HumanName.NameUse.Nickname;
	nickname.GivenElement.Add(new FhirString("Chris"));
	
	pat.Gender = AdministrativeGender.Male;
	
	pat.BirthDate = "1983-04-23";
	
	var birthplace = new Extension();
	birthplace.Url = "http://hl7.org/fhir/StructureDefinition/birthPlace";
	birthplace.Value = new Address() { City = "Seattle" };
	pat.Extension.Add(birthplace);
	
	var birthtime = new Extension("http://hl7.org/fhir/StructureDefinition/patient-birthTime",
	                               new FhirDateTime(1983,4,23,7,44));
	pat.BirthDateElement.Extension.Add(birthtime);
	
	var address = new Address()
	{
		Line = new string[] { "3300 Washtenaw Avenue, Suite 227" },
		City = "Ann Arbor",
		State = "MI",
		PostalCode = "48104",
		Country = "USA"
	};
	
	var contact = new Patient.ContactComponent();
	contact.Name = new HumanName();
	contact.Name.Given = new string[] { "Susan" };
	contact.Name.Family = "Parks";
	contact.Gender = AdministrativeGender.Female;
	contact.Relationship.Add(new CodeableConcept("http://hl7.org/fhir/v2/0131", "N"));
	contact.Telecom.Add(new ContactPoint(ContactPoint.ContactPointSystem.Phone, null, ""));
	pat.Contact.Add(contact);
	
	pat.Deceased = new FhirBoolean(false);

