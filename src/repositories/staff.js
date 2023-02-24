import axios from "axios"

export default function storeStaff(form, config) {
    return axios
        .postForm('http://127.0.0.1:8000/api/admin/staffs', form, config)
}