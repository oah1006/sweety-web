import axios from 'axios'

export function detach(id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    return axios
        .delete('http://127.0.0.1:8000/private/attachments/' + id, config)
}


export function store(attachmentable, attachmentableId, file, type) {
    const formData = new FormData()

    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    }

    const files = [];

    console.log(file)

    if (!(file instanceof FileList)) {
        formData.append('file[]', file)
    } else {
        for (let i = 0; i < file.length; i++) {
            formData.append('file[]', file[i])
        }
    }

    formData.append('type', type)

    return axios
        .postForm('http://127.0.0.1:8000/private/attachments/' + attachmentable + '/' + attachmentableId, formData, config)
}

