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
    description?: string
    outdoorCourts?: number
    indoorCourts?: number
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

type PermissionGrant = {
    email: string,
    role: string,
    managedLocations: string[]
    _id: string
}