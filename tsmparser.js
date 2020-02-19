//TSM PARSER FOR AZURE TIME SERIES INSIGHTS
//TAKES A JSON OBJECT FILLED WITH KEY/VALUE PAIR AND CONVERTS IT TO A TSM COMPLIANTE INSTANCES
//SCHEMA
//AUTHOR - DIEGO.VISO@MICROSOFT.COM

var fs = require("fs");
var colors = require("colors");

var myArgs = process.argv.slice(1);

console.log("\n*** TSM Parser ***");

if(myArgs.length != 5) {
	console.log("\nTakes a JSON key value object and converts it to a Instances compliant schema\nMissing input file.\n\nUsage: node tsmparser.js [input_json] [tsid] [hierarchyId] [typeId].\n");
	process.exit(1);
}

console.log("\nReading Input File... " + myArgs[1]+"\n");

var inputFile = fs.readFileSync(myArgs[1]);
var tags = JSON.parse(inputFile);

console.log("\nTotal entries... " + colors.green(tags.length));

var tagCount = 0;
var tagObjects = [];
var TSID = myArgs[2];
var typeId =myArgs[3];
var hierarchyIds = myArgs[4];

for (item in tags)
{
	var instanceFields = new Object();

	Object.keys(tags[item]).forEach(function(key) {
		instanceFields[key] = tags[item][key];
	});


	var data = {
		typeId: typeId,
		timeSeriesId: [tags[item][TSID]],
		hierarchyIds: [hierarchyIds],
		instanceFields
		}
	
		tagObjects.push(data);

	
};

console.log("\nWriting Output File... output.json");

var outputFile = JSON.stringify(tagObjects);

fs.writeFileSync('output.json', outputFile);

console.log("\nCompleted. \n");
