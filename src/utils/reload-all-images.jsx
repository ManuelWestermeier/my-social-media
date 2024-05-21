export default function reloadAllImages() {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    const src = img.getAttribute("src");
    const newSrc = `${src.split("?")[0]}?timestamp=${new Date().getTime()}`;
    img.setAttribute("src", newSrc);
  });
}
