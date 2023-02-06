import { ref } from "vue"
import axios from "axios"

export default function useLogin(employee) {
    return axios
        .post('http://127.0.0.1:8000/api/admin/auth/login', employee.value)
}