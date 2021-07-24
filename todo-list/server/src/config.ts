import 'dotenv/config';

const { PORT = '3000' } = process.env;
const baseUrl = `http://localhost:${PORT}`;

export default {
  port: Number.parseInt(PORT),
  baseUrl,
  hrefs: {
    tasks: `${baseUrl}/tasks`,
    task: (id: any) => `${baseUrl}/tasks/${id}`,
    profile: `${baseUrl}/profile.xhtml`
  }
};
