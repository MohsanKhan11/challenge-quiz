const getStars = (difficulty) => {
  switch (difficulty) {
    case 'easy':
      return '★☆☆'
    case 'medium':
      return '★★☆'
    case 'hard':
      return '★★★'
    default:
      return '★★☆'
  }
}

export default getStars
