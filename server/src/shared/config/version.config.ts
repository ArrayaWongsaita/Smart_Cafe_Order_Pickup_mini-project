import { VersioningOptions, VersioningType } from '@nestjs/common';

export const versionConfig: VersioningOptions = {
  type: VersioningType.URI,
  defaultVersion: '1',
};
