declare module 'backblaze-b2' {
  interface B2Config {
    applicationKeyId: string;
    applicationKey: string;
  }

  interface AuthorizeResponse {
    data: {
      authorizationToken: string;
      downloadUrl: string;
      apiUrl: string;
    };
  }

  interface UploadUrlResponse {
    data: {
      uploadUrl: string;
      authorizationToken: string;
    };
  }

  interface UploadFileOptions {
    uploadUrl: string;
    uploadAuthToken: string;
    fileName: string;
    data: Buffer;
    contentLength: number;
    contentType: string;
  }

  interface UploadFileResponse {
    data: {
      fileId: string;
      fileName: string;
      fileInfo: Record<string, string>;
    };
  }

  interface ListFileNamesOptions {
    bucketId: string;
    startFileName?: string;
    maxFileCount?: number;
  }

  interface ListFileNamesResponse {
    data: {
      files: Array<{
        fileId: string;
        fileName: string;
      }>;
    };
  }

  interface DeleteFileVersionOptions {
    fileId: string;
    fileName: string;
  }

  class B2 {
    constructor(config: B2Config);
    authorize(): Promise<AuthorizeResponse>;
    getUploadUrl(options: { bucketId: string }): Promise<UploadUrlResponse>;
    uploadFile(options: UploadFileOptions): Promise<UploadFileResponse>;
    listFileNames(options: ListFileNamesOptions): Promise<ListFileNamesResponse>;
    deleteFileVersion(options: DeleteFileVersionOptions): Promise<{ data: unknown }>;
  }

  export default B2;
}

