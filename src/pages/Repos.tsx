// import { useFetch } from "./hooks/useFetch"

import axios from 'axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

export type Repository = {
  full_name: string
  description: string
}

export function Repos() {

  // const { data: repositories, isFetching } =
  // useFetch<Repository[]>('/users/dselvati/repos')

  const { data, isFetching } = useQuery<Repository[]>('repos', async () => {
    const response = await axios.get('https://api.github.com/users/dselvati/repos')

    return response.data
  }, {
    // refetchOnWindowFocus: false,
    staleTime: 1000 * 60 // 1 minute
  })

  return (
    <ul>
      {isFetching && <p>Carregando...</p>}
      {
        data?.map(repo =>
          <li key={repo.full_name}>
            <Link to={`repos/${repo.full_name}`}>
              {repo.full_name}
            </Link>
            <p>{repo.description}</p>
          </li>
        )
      }
    </ul>
  )
}
