export interface Tour {
  id: string;
  name: string;
  city: string;
  days: number;
  price: number;
  seats: number;
  departure: string;
  image: string;
  isFavorite: boolean;
}

export const formatDate = (dateStr: string) => {
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
};

export const getSeatLabel = (seats: number) => {
  if (seats === 0) return "Hết chỗ";
  if (seats >= 1 && seats <= 3) return `Chỉ còn ${seats} chỗ`;
  return `Còn ${seats} chỗ`;
};

export const prepareFlatListData = (tours: Tour[]) => {
  const groups: Record<string, Tour[]> = {};
  
  tours.forEach((t) => {
    if (!groups[t.city]) groups[t.city] = [];
    groups[t.city].push(t);
  });

  const sortedCities = Object.keys(groups).sort((a, b) => a.localeCompare(b));

  const flatData: any[] = [];
  const stickyIndices: number[] = [];

  sortedCities.forEach((city) => {
    const cityTours = groups[city].sort(
      (a, b) => new Date(a.departure).getTime() - new Date(b.departure).getTime()
    );

    if (cityTours.length > 0) {
      stickyIndices.push(flatData.length);
      flatData.push({
        isHeader: true,
        id: `header_${city}`,
        title: `${city} · ${cityTours.length} tour`,
      });

      cityTours.forEach((tour) => {
        flatData.push({ isHeader: false, ...tour });
      });
    }
  });

  return { flatData, stickyIndices };
};