# Media Server

> A media utility, handles compression of media files, publishing of streamed media files, uploading media to cloud storage...

## ffmpeg
- A command line utility that allows access to native video transcoding functionality.
> Requires an installation of ffmpeg to be usable :(.
> TODO: remove ffmeg dependency, use express / node media data transcoding.

## node-media-server
- A node library which creates a streaming urls from media files.
- UNUSED while data transcoding is done with Node streams.

## compress
- Creates compressed data chunks from a specified path.

## busboy
- handles large file uploads.

## AWS s3
- Storage of media files.
- Can become costly if requests volume increases greatly.
- requires AWS User with appropriate credentials and permissions
###Usage
#### Credentials
- Go to AWS IAM, make sure you have a user created.
- You'll need the `User ARN` ex: `arn:aws:iam:USER_ID:user/USER_NAME`.
- Add a permission for the user which includes `AmazonS3FullAccess`.
- Click on `Security credentials` and click `Create access key`.
- Once key is created, Copy `Access key Id` and `Secret access key` and save to a file titled: `.env`.
    - Make sure you use these varible names in your `.env` file:
        - `AWS_SECRET_ACCESS_KEY=YOUR-ACCESS-KEY-ID`
        - `AWS_ACCESS_KEY_ID=YOUR-SECRET-ACCESS-KEY`
#### Saving to a Bucket
- Log into amazon developer console and create an s3 bucket for you saved media.
    - NOTE: Create an amazon account if haven't created one already.
- Create another variable within `.env`:
    - `AWS_S3_BUCKET=YOUR-MEDIA-STORAGE-BUCKET`
        - This variable should match the name of the bucket you created in the step above.

### TODOS:
- Modular refactor:
    - server functionality should be moved to routing and middleware functions.
- Data Modeling:
    - Authentication / Authorization of service access based on User.
    - Data models and associations for media features. 
