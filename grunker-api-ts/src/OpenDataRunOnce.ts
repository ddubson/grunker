import {fetchN311Items, Nyc311DataItem, requiredEnvVarsExist} from "./OpenDataRepository";

const openDataRunOnce = async () => {
  console.log("Verifying env is setup right...")
  if (!requiredEnvVarsExist()) {
    console.error("Required env vars are not set. Exiting.");
    process.exit(1);
  }

  console.log("Calling OpenData...");
  await fetchN311Items(10).then((dataItems: Nyc311DataItem[]) => {
    console.log(dataItems);
  }).catch(error => console.error("Error retrieving data: ", error));
}

openDataRunOnce().then(r => console.log("done"));


