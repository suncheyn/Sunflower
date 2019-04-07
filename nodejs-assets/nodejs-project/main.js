// Rename this sample file to main.js to use on your project.
// The main.js file will be overwritten in updates/reinstalls.

var rn_bridge = require('rn-bridge');

function getResults(uri){      
      const PredictionApiClient = require("azure-cognitiveservices-customvision-prediction");
      const fs = require('fs');
      const predictor = new PredictionApiClient("21dacdd8dc234726ba8bd867714d6322", "https://southcentralus.api.cognitive.microsoft.com");
      const testFile = fs.readFileSync(uri);

      const results = predictor.classifyImage("750f513e-7db3-4dc7-85f6-de036ceca83a", publishIterationName, testFile);
      var result = 
      // Step 6. Show results
      console.log("Results:");
      results.predictions.forEach(predictedResult => {
          result += "\t ${predictedResult.tagName}: ${(predictedResult.probability * 100.0).toFixed(2)}%";
      });
      return result;
}

// Echo every message received from react-native.
rn_bridge.channel.on('message', (msg) => {
  //rn_bridge.channel.send(getReseults(msg));
  rn_bridge.channel.send(msg);
} );

// Inform react-native node is initialized.
rn_bridge.channel.send("Node was initialized.");