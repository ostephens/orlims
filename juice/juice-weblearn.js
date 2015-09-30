jQuery(document).ready(function () {
	// Assumes that the page calling this file is in a directory also containing the juice folder
	// Can be moved to whereever you want, just correct the paths
	juice.setDebug(false);
	juice.loadJs("./juice/metadefs/sakaich_metadef.js");
	juice.loadJs("./juice/extensions/extendedbyJuice.js");
	juice.loadJs("./juice/extensions/daiaAvailability.js");
	juice.loadJs("./juice/extensions/oxfalephAvailability.js");
	juice.loadJs("./juice/extensions/oxfelectronicAvailability.js");
	juice.loadCss("./juice/panels/juiceDefault.css");	
	juice.onAllLoaded(runExtensions);
});

function runExtensions(){
	sakaich_metadef();
	if(juice.hasMeta()){
		if(juice.hasMeta("aleph_ids")){
			
			// ****************	
			// Get Print Availability
			// ****************

			// Do this via new availability service...
			
			var availServer = ""; // New Aleph availability server address
			var availabilityDiv = '<div class="availability"></div>';
			var availabilityHeadDiv = 'div.availabilityHeader';
			var insert_avail = new JuiceInsert(availabilityDiv,availabilityHeadDiv,"replace");
			
			// call oxfalephAvailability
			/*
			 * Constructor arguments:
			 * arg: ju - instance of juice
			 * arg: insert - JuiceInsert to use
			 * arg: targetDiv - id of element to place image in
			 * arg: availIDs - Juice Meta element containing array of IDs
			 * arg: availServer - url of availability server
			 * arg: numberOfLines - number of availability lines to display unhidden. 
			 */
			new oxfalephAvailability(juice,insert_avail,"availability","aleph_ids",availServer,"print","jsonp");
		}

		if(juice.hasMeta("coins")) {
			// ****************	
			// Get Electronic Availability
			// ****************
			var eavailServer = "https://weblearn.ox.ac.uk/library-availability/library"; // DAIA server for electronic availability
			var eavailabilityDiv = '<div id="e-availability"></div>';
			var baseURL = "http://oxfordsfx-direct.hosted.exlibrisgroup.com/oxford?";
			var insert_eavail = new JuiceInsert(eavailabilityDiv,"span.Z3988","after");
		}

		// ****************	
		// Put footer in
		// ****************

		doCreatedBy();
		
		
	}
}

function doCreatedBy(){
	new extendedbyJuice(juice);
} 