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

### TODOS:
- Modular refactor:
    - server functionality should be moved to routing and middleware functions.
- Data Modeling:
    - Authentication / Authorization of service access based on User.
    - Data models and associations for media features. 
