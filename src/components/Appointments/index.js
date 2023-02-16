// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {appointmentsList: [], title: '', date: ''}

  addTitle = event => {
    this.setState({title: event.target.value})
  }

  addDate = event => {
    this.setState({date: event.target.value})
  }

  postAppointment = event => {
    event.preventDefault()

    const {title, date} = this.state

    const dateInput = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const newAppointment = {
      id: uuidv4(),
      title,
      date: dateInput,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {appointmentsList, title, date} = this.state
    const filteredAppointmentsList = this.getFilteredAppointmentsList()
    return (
      <div>
        <div>
          <div>
            <div>
              <h1>Add Appointment</h1>
              <form onSubmit={this.postAppointment}>
                <label htmlFor="title">TITLE</label>
                <input
                  id="title"
                  type="text"
                  placeholder="Title"
                  onChange={this.addTitle}
                  value={title}
                />
                <label htmlFor="date">DATE</label>
                <input
                  type="date"
                  id="date"
                  onChange={this.addDate}
                  value={date}
                />
                <button type="submit" data-testid="star">
                  Add
                </button>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <h1>Appointments</h1>
          <button type="button" onClick={this.onFilter}>
            Starred
          </button>
          <ul>
            {filteredAppointmentsList.map(eachItem => (
              <AppointmentItem
                details={eachItem}
                key={eachItem.id}
                onStarred={this.onStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
