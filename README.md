# Image Filter Microservice

Simple Express app responsible for filtering images.

#### AWS Dev Environment Domain: http://image-filter-svc-dev.us-east-1.elasticbeanstalk.com/

## Usage

This app exposes a single API resource:
```
GET /api/v0/filteredimage?image_url={VALID_IMAGE_URL}
```

and will return a filtered version of the provided image.

## Development

1. Install dependencies with `npm i`
2. Run the local dev server with `npm run dev`

## Code validation / Testing

1. Run `npm run ci` to run integration tests/validation

## Continuous Deployment

This app is deployed to AWS Elastic Beanstalk when a tag is cut using TravisCI.
