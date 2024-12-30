
export const useSearchBar = (searchName: string, availableLocation: string) => {
    const getPlaceholderText = () => {
        if (searchName && availableLocation) {
          return <span><strong>{searchName}</strong>, {availableLocation}</span>;
        }
        if (searchName) {
          return <strong>{searchName}</strong>;
        }
        return 'Click to Search';
      };

    return {
        getPlaceholderText,
    }
}