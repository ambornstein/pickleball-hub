type Venue = {
    _id: string
    name: string,
    address: string,
    phoneNumber: string,
    url: string,
    zipcode: number,
    openPlay: boolean,
    reservations: boolean,
    lessons: boolean
    schedule: Schedule
}

type Schedule = {
    weekday?: ScheduleTime,
    saturday?: ScheduleTime,
    sunday?: ScheduleTime
}

type ScheduleTime = {
    day: string,
    openTime: number,
    closeTime: number
}

type LocationData = {
    name: string,
    coordinates: [number],
    address: string,
    zipcode: string,
    url: string,
}