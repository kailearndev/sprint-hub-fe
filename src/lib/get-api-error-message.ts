import axios from 'axios'

const getResponseMessage = (message: unknown) => {
    if (Array.isArray(message)) {
        return message.filter(Boolean).join(', ')
    }

    if (typeof message === 'string') {
        return message
    }

    return undefined
}

export const getApiErrorMessage = (error: unknown) => {
    if (!axios.isAxiosError(error)) {
        return 'Có lỗi không xác định'
    }
    console.log(error);

    const status = error.response?.status
    const responseMessage = getResponseMessage(error.response?.data?.message)

    switch (status) {
        case 400:
            return responseMessage || 'Dữ liệu không hợp lệ'

        case 401:
            return 'Phiên đăng nhập đã hết hạn'

        case 403:
            return 'Bạn không có quyền truy cập'

        case 404:
            return 'Không tìm thấy dữ liệu'

        case 409:
            return 'Dữ liệu đã tồn tại'

        case 422:
            return responseMessage || 'Thông tin nhập chưa đúng'

        case 500:
            return 'Lỗi hệ thống'

        default:
            return responseMessage || 'Có lỗi xảy ra'
    }
}
