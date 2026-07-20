import * as core from "@actions/core";
import { AutoConfig, AutoConfigError, type EndpointIn } from "svix";

export async function run(): Promise<void> {
  try {
    const token = core.getInput("autoconfig-token", { required: true });
    const endpointRaw = core.getInput("endpoint", { required: true });

    let endpoint: EndpointIn;
    try {
      endpoint = JSON.parse(endpointRaw) as EndpointIn;
    } catch {
      throw new Error("Invalid JSON in 'endpoint' input");
    }

    const webhook = new AutoConfig(token, endpoint);
    const result = await webhook.subscribe();

    core.info(`Subscribed endpoint ${result.id} with URL ${result.url}`);
    core.setOutput("endpoint", JSON.stringify(result));
  } catch (error) {
    const message =
      error instanceof AutoConfigError
        ? "Invalid AutoConfig token"
        : error instanceof Error
          ? error.message
          : String(error);
    core.setFailed(message);
  }
}
