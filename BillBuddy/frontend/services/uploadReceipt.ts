export async function uploadReceipt(file: File) {
  const formData = new FormData()

  formData.append("file", file)

  const response = await fetch(
    "https://shortcut-asia-billbuddy.onrender.com",
    {
      method: "POST",
      body: formData,
    }
  )

  if (!response.ok) {
    throw new Error("Upload failed")
  }

  return response.json()
}