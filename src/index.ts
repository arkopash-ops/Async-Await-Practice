// ===== Photo Model =====
interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

// ===== Photo Service =====
async function fetchPhotos(limit: number = 20): Promise<Photo[]> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos?_limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch photos");
  }

  const photos: Photo[] = await response.json();
  return photos;
}

// ===== UI Renderer =====
const list = document.getElementById("photoList") as HTMLDivElement | null;

function renderPhotos(photos: Photo[]): void {
  if (!list) return;

  list.innerHTML = "";

  photos.forEach(photo => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-md-4 col-lg-3";

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${photo.thumbnailUrl}" class="card-img-top" alt="${photo.title}">
        <div class="card-body">
          <p class="card-text small">${photo.title}</p>
        </div>
      </div>
    `;

    list.appendChild(col);
  });
}

// ===== App Init =====
console.log("TypeScript Connected");

async function init() {
  const errorEl = document.getElementById("error");

  try {
    const photos = await fetchPhotos(20);
    renderPhotos(photos);
  } catch (error) {
    if (errorEl) {
      errorEl.textContent = "Failed to load photos. Try again later.";
    }
    console.error(error);
  }
}

init();
