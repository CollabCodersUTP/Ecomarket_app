export function deleteRowById<T extends { id: number }>(
    id: number,
    items: T[],
    setItems: React.Dispatch<React.SetStateAction<T[]>>,
    onDelete?: (deleted: T | undefined) => void
) {
    const deleted = items.find(item => item.id === id);
    const filtered = items.filter(item => item.id !== id);
    setItems(filtered);
    if (onDelete) onDelete(deleted);
}

