const serverUrl = "http://localhost:4000"

export default {
  get: async (url: string) => {
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
    const res = await fetch(`${serverUrl}/${url}`, options)
    return await res.json()
  },

  post: async (data: any, url: string) => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data)
    }

    const res = await fetch(`${serverUrl}/${url}`, options)
    return await res.json()
  },
  patch: async (data: any, url: string) => {
    const options = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data)
    }

    const res = await fetch(`${serverUrl}/${url}`, options)
    return await res.json()
  },

  delete: async (data: any, url: string) => {
    const options = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data)
    }

    const res = await fetch(`${serverUrl}/${url}`, options)
    return await res.json()
  }

}