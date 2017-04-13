Snapshot generation options
---------------------------


----- Under Construction ---------- 


On default Forge saves your work as a differential. Forge is capable of saving your work as a snaphot. 
The Options menu provides a set of configuration settings that control the behavior of snapshot expansion
  - Save snapshot component
  
    Enable/disable expansion of the snapshot component.

	
  - "Merge element type profiles"
    enabled:  first merge with constraints from external element type profiles, then with base profile.
	disabled: ignore type profiles, only merge with base profile.
	
  - "Expand external profiles on demand"
    enabled:  automatically expand the snapshot of any referenced external profiles, if it is missing (in memory, not persisted).
	disabled: abort upon encountering an external profile without a snapshot component.
	          The user must ensure that all referenced external profiles contain a valid snapshot component.
			  
  - "Rewrite element base paths"
    enabled:  recompute all element base paths by tracking the base profile hierarchy upto the root.
	          Useful if the base profile contains invalid base paths.
	disabled: inherit element base paths from the immediate base profile.
	
  - "Normalize element base paths"
    enabled:  base path of complex type child elements refers to the external type profile that originally defines the element
	          Example: "Patient.name.given" => Base.Path = "HumanName.given" (derived from parent element type = "HumanName")
			  This behavior is conform the new STU3 FHIR specification.
	disabled: base path of complex type child elements refers to the base profile
	          Example: "Patient.name.given" => Base.Path = "Patient.name.given" (derived from base profile "Patient")
			  This behavior is conform the current DSTU2 FHIR specification.