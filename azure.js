'use strict';


const fs = require('fs');
const util = require('util');
const TrainingApiClient = require("azure-cognitiveservices-customvision-training");
const PredictionApiClient = require("azure-cognitiveservices-customvision-prediction");

const setTimeoutPromise = util.promisify(setTimeout);

const trainingKey = "25cec4a86dc049a4be1e5eca60c89262";
const predictionKey = "21dacdd8dc234726ba8bd867714d6322";
const predictionResourceId = "/subscriptions/d58f919c-a94b-4339-99c8-a6a29dec1793/resourceGroups/GoddessesAtWork/providers/Microsoft.CognitiveServices/accounts/GoddessesAtWork_prediction";
const sampleDataRoot = "Flowers";

const endPoint = "https://southcentralus.api.cognitive.microsoft.com"

const publishIterationName = "classifyModel";

const trainer = new TrainingApiClient(trainingKey, endPoint);

(async () => {
    console.log("Creating project...");
    const flowerProject = await trainer.createProject("GoddessesAtWork")
    console.log("here?????");
    //const adorationTag = await trainer.createTag(flowerProject.id, "Adoration");
    const carnationTag = await trainer.createTag(flowerProject.id, "Carnation");
    const daisyTag = await trainer.createTag(flowerProject.id, "Daisy");
    //const mothersDayTag = await trainer.createTag(flowerProject.id, "Mother's Day");
    //const pinkTag = await trainer.createTag(flowerProject.id, "Pink");
    //const purpleTag = await trainer.createTag(flowerProject.id, "Purple");
   	//const romanticTag = await trainer.createTag(flowerProject.id, "Romantic");
    const sunflowerTag = await trainer.createTag(flowerProject.id, "Sunflower");
    //const whiteTag = await trainer.createTag(flowerProject.id, "White");
    //const anniversariesTag = await trainer.createTag(flowerProject.id, "Anniversaries");
    const azaleaTag = await trainer.createTag(flowerProject.id, "Azalea");
    //const beautyTag = await trainer.createTag(flowerProject.id, "Beauty");
    //const birthdaysTag = await trainer.createTag(flowerProject.id, "Birthdays");
    //const easterTag = await trainer.createTag(flowerProject.id, "Easter");
    //const eleganceTag = await trainer.createTag(flowerProject.id, "Elegance");
    const gardeniaTag = await trainer.createTag(flowerProject.id, "Gardenia");
    //const housewarmingTag = await trainer.createTag(flowerProject.id, "Housewarming");
    //const innocenceTag = await trainer.createTag(flowerProject.id, "Innocence");
    const lilacTag = await trainer.createTag(flowerProject.id, "Lilac");
    //const loveTag = await trainer.createTag(flowerProject.id, "Love");
    //const loyaltyTag = await trainer.createTag(flowerProject.id, "Loyalty");
    const orchidTag = await trainer.createTag(flowerProject.id, "Orchid");
    //const partyTag = await trainer.createTag(flowerProject.id, "Party");
    //const purityTag = await trainer.createTag(flowerProject.id, "Purity");
    const roseTag = await trainer.createTag(flowerProject.id, "Rose");
    const tulipTag = await trainer.createTag(flowerProject.id, "Tulip");
    //const yellowTag = await trainer.createTag(flowerProject.id, "Yellow");

    let fileUploadPromises = [];
    console.log("DID WE GET STUCK HERE?");

    const carnationDir = '${sampleDataRoot}/Carnation';
    const carnationFiles = fs.readdirSync(carnationDir);
    carnationFiles.forEach(file => {
        fileUploadPromises.push(trainer.createImagesFromData(flowerProject.id, fs.readFileSync(`${carnationDir}/${file}`), { tagIds: [carnationTag.id] }));
    });

    const daisyDir = '${sampleDataRoot}/Daisy';
    const daisyFiles = fs.readdirSync(daisyDir);
    daisyFiles.forEach(file => {
        fileUploadPromises.push(trainer.createImagesFromData(flowerProject.id, fs.readFileSync(`${daisyDir}/${file}`), { tagIds: [daisyTag.id] }));
    });

	const sunflowerDir = '${sampleDataRoot}/Sunflower';
    const sunflowerFiles = fs.readdirSync(sunflowerDir);
    sunflowerFiles.forEach(file => {
        fileUploadPromises.push(trainer.createImagesFromData(flowerProject.id, fs.readFileSync(`${sunflowerDir}/${file}`), { tagIds: [sunflowerTag.id] }));
    });

    const azaleaDir = '${sampleDataRoot}/Azalea';
    const azaleaFiles = fs.readdirSync(azaleaDir);
    azaleaFiles.forEach(file => {
        fileUploadPromises.push(trainer.createImagesFromData(flowerProject.id, fs.readFileSync(`${azaleaDir}/${file}`), { tagIds: [azaleaTag.id] }));
    });

    const gardeniaDir = '${sampleDataRoot}/Gardenia';
    const gardeniaFiles = fs.readdirSync(gardeniaDir);
    gardeniaFiles.forEach(file => {
        fileUploadPromises.push(trainer.createImagesFromData(flowerProject.id, fs.readFileSync(`${gardeniaDir}/${file}`), { tagIds: [gardeniaTag.id] }));
    });

    const lilacDir = '${sampleDataRoot}/Lilac';
    const lilacFiles = fs.readdirSync(lilacDir);
    lilacFiles.forEach(file => {
        fileUploadPromises.push(trainer.createImagesFromData(flowerProject.id, fs.readFileSync(`${lilacDir}/${file}`), { tagIds: [lilacTag.id] }));
    });

    const roseDir = '${sampleDataRoot}/Rose';
    const roseFiles = fs.readdirSync(roseDir);
    roseFiles.forEach(file => {
        fileUploadPromises.push(trainer.createImagesFromData(flowerProject.id, fs.readFileSync(`${roseDir}/${file}`), { tagIds: [roseTag.id] }));
    });

    const tulipDir = '${sampleDataRoot}/Tulip';
    const tulipFiles = fs.readdirSync(tulipDir);
    tulipFiles.forEach(file => {
        fileUploadPromises.push(trainer.createImagesFromData(flowerProject.id, fs.readFileSync(`${tulipDir}/${file}`), { tagIds: [tulipTag.id] }));
    });

    const orchidDir = '${sampleDataRoot}/Orchid';
    const orchidFiles = fs.readdirSync(orchidDir);
    orchidFiles.forEach(file => {
        fileUploadPromises.push(trainer.createImagesFromData(flowerProject.id, fs.readFileSync(`${orchidDir}/${file}`), { tagIds: [orchidTag.id] }));
    });

    await Promise.all(fileUploadPromises);
	
	console.log("Training...");
    let trainingIteration = await trainer.trainProject(flowerProject.id);

    // Wait for training to complete
    console.log("Training started...");
    while (trainingIteration.status == "Training") {
        console.log("Training status: " + trainingIteration.status);
        await setTimeoutPromise(1000, null);
        trainingIteration = await trainer.getIteration(flowerProject.id, trainingIteration.id)
    }
    console.log("Training status: " + trainingIteration.status);

    trainingIteration.isDefault = true;
    await trainer.updateIteration(flowerProject.id, trainingIteration.id, trainingIteration);


	const predictor = new PredictionApiClient(predictionKey, endPoint);
    const testFile = fs.readFileSync('${sampleDataRoot}/Test/test.jpg');

    const results = await predictor.predictImage(flowerProject.id, testFile, { iterationId: trainingIteration.id });

    // Step 6. Show results
    console.log("Results:");
    results.predictions.forEach(predictedResult => {
        console.log(`\t ${predictedResult.tagName}: ${(predictedResult.probability * 100.0).toFixed(2)}%`);
  });
})()