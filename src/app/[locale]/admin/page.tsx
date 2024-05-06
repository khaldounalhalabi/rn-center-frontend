'use client'
import CheckTimeAvailable from "@/hooks/CheckTimeAvailable";
import dayjs from "dayjs";
import * as isBetween from 'dayjs/plugin/isBetween'
const Page = () => {
  const nAv:AvailableTime = {
    "booked_times": [],
    "clinic_schedule": {
      "monday": [
        {
          "id": 4,
          "schedulable_type": "App\\Models\\Clinic",
          "schedulable_id": 1,
          "day_of_week": "monday",
          "start_time": "12:14",
          "end_time": "09:09",
          "created_at": "2024-05-02T00:19:06.000000Z",
          "updated_at": "2024-05-02T00:19:06.000000Z"
        }
      ],
      "saturday": [
        {
          "id": 2,
          "schedulable_type": "App\\Models\\Clinic",
          "schedulable_id": 1,
          "day_of_week": "saturday",
          "start_time": "20:01",
          "end_time": "02:02",
          "created_at": "2024-05-02T00:19:06.000000Z",
          "updated_at": "2024-05-02T00:19:06.000000Z"
        }
      ],
      "sunday": [
        {
          "id": 3,
          "schedulable_type": "App\\Models\\Clinic",
          "schedulable_id": 1,
          "day_of_week": "sunday",
          "start_time": "15:58",
          "end_time": "15:16",
          "created_at": "2024-05-02T00:19:06.000000Z",
          "updated_at": "2024-05-02T00:19:06.000000Z"
        }
      ],
      "thursday": [
        {
          "id": 5,
          "schedulable_type": "App\\Models\\Clinic",
          "schedulable_id": 1,
          "day_of_week": "thursday",
          "start_time": "20:55",
          "end_time": "07:12",
          "created_at": "2024-05-02T00:19:06.000000Z",
          "updated_at": "2024-05-02T00:19:06.000000Z"
        }
      ],
      "wednesday": [
        {
          "id": 1,
          "schedulable_type": "App\\Models\\Clinic",
          "schedulable_id": 1,
          "day_of_week": "wednesday",
          "start_time": "17:12",
          "end_time": "10:23",
          "created_at": "2024-05-02T00:19:06.000000Z",
          "updated_at": "2024-05-02T00:19:06.000000Z"
        }
      ]
    },
    "clinic_holidays": [
      {
        "id": 1,
        "start_date": "2024-04-29",
        "end_date": "2024-05-14",
        "reason": "{\"en\":\"ut\",\"ar\":\"et\"}",
        "clinic_id": 1,
        "created_at": "2024-05-02T00:19:06.000000Z",
        "updated_at": "2024-05-02T00:19:06.000000Z"
      },
      {
        "id": 2,
        "start_date": "2024-01-01",
        "end_date": "2024-02-10",
        "reason": "{\"en\":\"perferendis\",\"ar\":\"a\"}",
        "clinic_id": 1,
        "created_at": "2024-05-02T00:19:06.000000Z",
        "updated_at": "2024-05-02T00:19:06.000000Z"
      }
    ]
  }

  console.log(CheckTimeAvailable(nAv,"2024-05-16",27))
  return <h1></h1>;
};

export default Page;
