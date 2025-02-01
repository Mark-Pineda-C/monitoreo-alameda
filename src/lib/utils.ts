export async function fetchStorageUrl({
  postUrl,
  contentType,
  file,
}: {
  postUrl: string;
  contentType?: string;
  file?: File;
}) {
  if (!file || !contentType) return { storageId: undefined };
  const pre = await fetch(postUrl, {
    method: "POST",
    headers: { "Content-Type": contentType },
    body: file,
  });

  return await pre.json();
}
