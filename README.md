<p align="center">
  <a href="https://www.svix.com">
    <img width="120" alt="Svix - Webhooks as a service" src="https://avatars.githubusercontent.com/u/80175132?s=200&v=4">
  </a>
</p>

# Subscribe Webhook Endpoint with AutoConfig - GitHub Action

This GitHub action configures a webhook endpoint using [Webhooks AutoConfig](https://docs.svix.com/receiving/webhooks-autoconfig).
AutoConfig lets you declare your endpoint configuration in code, so it's always in sync with your code, without any manual changes in the webhooks management UI.
For more information, check out [our docs](https://docs.svix.com/receiving/webhooks-autoconfig).

## Inputs

### `autoconfig-token`

**Required**
Your [AutoConfig token](https://docs.svix.com/receiving/webhooks-autoconfig#get-the-autoconfig-token) from the Svix Application Portal (`auto_v1_...`).

### `endpoint`

**Required**
A JSON object describing the endpoint configuration ([`EndpointIn`](https://api.svix.com/docs#tag/Endpoint/operation/v1.endpoint.create)).

Supported fields include `url`, `filterTypes`, `description`, `disabled`, `channels`, `headers`, `metadata`, `uid`, `version`, and `throttleRate`.

Example:

```json
{
  "url": "https://api.us.example.com/webhooks/acme",
  "filterTypes": ["invoice.paid", "user.created"]
}
```

## Outputs

### `endpoint`

The full configured endpoint returned by [`subscribe()`](https://docs.svix.com/receiving/webhooks-autoconfig#call-subscribe) ([`EndpointOut`](https://api.svix.com/docs#tag/Endpoint/operation/v1.endpoint.get)) as a JSON string.

## Usage

To use this GitHub Action in your workflow, add the following step to your [CI/CD pipeline](https://docs.svix.com/receiving/webhooks-autoconfig#integrating-with-your-application):

```yaml
- name: Subscribe Webhook Endpoint with AutoConfig
  uses: svix/webhooks-autoconfig-action@v1.0.0
  with:
    autoconfig-token: ${{ secrets.AUTO_CONFIG_TOKEN }}
    endpoint: |
      {
        "url": "https://api.us.example.com/webhooks/acme",
        "filterTypes": ["invoice.paid", "user.created"]
      }
```

Before using this action, [create an endpoint](https://docs.svix.com/receiving/webhooks-autoconfig#create-an-endpoint) with AutoConfig as the configuration method and get the AutoConfig token.

## Documentation

- [Webhooks AutoConfig guide](https://docs.svix.com/receiving/webhooks-autoconfig)
- [Endpoint API reference](https://api.svix.com/docs#tag/Endpoint)
- [Svix documentation](https://docs.svix.com)
