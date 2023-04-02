import { Header } from '@nestjs/common';

export const SirenContent = () => Header('Content-Type', 'application/vnd.siren+json');
