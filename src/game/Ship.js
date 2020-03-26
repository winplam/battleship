// Generate row,col coordinates of every section of a ship
function createCoords (row, col, length, orientation) {
  // Horizontal ships have orientation of true. Vertical is false
  let coordinates = []
  for (let i = 0; i < length; i++) {
    orientation
      ? coordinates.push({ row, col: col + i })
      : coordinates.push({ row: row + i, col })
  }
  return coordinates
}

// Factory function for ship properties and actions when ship is hit or sunk
export default function Ship (row, col, length = 1, orientation = true) {
  // Horizontal ships have orientation of true. Vertical is false
  let hitCount = 0
  const coords = createCoords(row, col, length, orientation)
  const startCoords = () => ({ row, col })
  const hit = () => hitCount++
  const isSunk = () => hitCount === length

  return {
    coords,
    hit,
    isSunk,
    length,
    orientation,
    startCoords,
  }
}
