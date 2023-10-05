export default async function handler(req, res) {
  // 再度投稿を取得する
  const { path, token } = req.body;

  if (token !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  } else if (!path || path.length === 0) {
    return res.status(400).json({ message: "Invalid path" });
  }

  try {
    await res.unstable_revalidate(path);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  return res.status(200).json({
    revalidated: true,
    message: `Path ${path} revalidated successfully`,
  });
}
