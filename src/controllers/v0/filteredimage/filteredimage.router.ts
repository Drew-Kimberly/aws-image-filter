import { Router, Request, Response } from 'express';
import isUrl from 'validator/lib/isURL';
import { filterImageFromURL, deleteLocalFiles } from '../../../util/util';

const router: Router = Router();

const cleanUpTempFiles = (files: string[]) => async () => {
  await deleteLocalFiles(files);
};

router.get('/', async (req: Request, resp: Response) => {
  const imageUrl: string = req.query.image_url;

  // Validate that the image_url query param is present.
  if (!imageUrl) {
    return resp
      .status(400)
      .send({ message: 'The image_url query parameter is required' });
  }

  // Validate that the image_url query param is a valid URL.
  if (
    // eslint-disable-next-line @typescript-eslint/camelcase
    !isUrl(imageUrl, { require_valid_protocol: true, require_protocol: true })
  ) {
    return resp
      .status(400)
      .send({ message: 'The image_url must be a valid URL' });
  }

  try {
    const filteredImage: string = await filterImageFromURL(imageUrl);
    resp.on('finish', cleanUpTempFiles([filteredImage]));
    resp.sendFile(filteredImage);
  } catch (e) {
    resp.status(422).send({
      message: `Unable to filter the image provided at: ${imageUrl}. Reason: ${e}`
    });
  }
});

export const FilteredImageRouter: Router = router;
