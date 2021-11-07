# Harvest integration

This will fetch hours from Harvest for each named person, applies some tranformations and stores the output. 

## API 

Documentation: 
https://help.getharvest.com/api-v2/

Notie that according to the documentation the rate limit for general API requests is 100 requests per 15 seconds.

## Secrets

Create Access tokens from Harvest Developer-section. Then set the keys to these environment variables:

```
export HARVEST_ACCOUNT_ID=...
export HARVEST_SECRET=...
```  

