// Write your code here
const AppointmentItem = props => {
  const {details, onStarred} = props
  const {title, date, isStarred, id} = details
  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const starred = () => {
    onStarred(id)
  }
  return (
    <li>
      <div>
        <p>{title}</p>
        <button type="button" onClick={starred}>
          <img src={starImage} alt="star" />
        </button>
      </div>
      <p>Date:{date}</p>
    </li>
  )
}

export default AppointmentItem
