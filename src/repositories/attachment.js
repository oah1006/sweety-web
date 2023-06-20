import axios from 'axios'

export function detach(id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    return axios
        .delete(process.env.BASE_API + '/private/attachments/' + id, config)
}


export function storeAttachment(attachmentable, attachmentableId, file, type) {
    const formData = new FormData()

    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    }

    const files = [];

    if (!(file instanceof FileList)) {
        formData.append('file[]', file)
    } else {
        for (let i = 0; i < file.length; i++) {
            formData.append('file[]', file[i])
        }
    }

    formData.append('type', type)

    return axios
        .postForm(process.env.BASE_API + '/private/attachments/' + attachmentable + '/' + attachmentableId, formData, config)
}

