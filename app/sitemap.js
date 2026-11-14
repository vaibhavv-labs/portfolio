export default function sitemap() {
  const baseUrl = 'https://vaibhavv.is-a.dev';
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}
