import {fetchN311Items, requiredEnvVarsExist} from "./OpenDataGateway";
import {Nyc311Complaint} from "../../grunker-domain-ts/Nyc311Complaint";

const openDataRunOnce = async () => {
  console.log("Verifying env is setup right...")
  if (!requiredEnvVarsExist()) {
    console.error("Required env vars are not set. Exiting.");
    process.exit(1);
  }

  console.log("Calling OpenData...");
  await fetchN311Items(10).then((dataItems: Nyc311Complaint[]) => {
    console.log(dataItems);
  }).catch(error => console.error("Error retrieving data: ", error));
}

openDataRunOnce().then(r => console.log("done")).catch(console.error);


