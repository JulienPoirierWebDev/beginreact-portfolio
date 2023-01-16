import { SectionWrapper } from '../atom/SectionWrapper';
import { Project } from './Project';
import {useEffect} from "react";
import {getListOfUrlRepositoriesUrl} from "../../lib/api-url";
import {GITHUB_USERNAME} from "../../lib/config";
import {Loader} from "../atom/Loader";
import {FETCH_ACTIONS, useFetch} from "../../hooks/useFetch";



export const ProjectSection = () => {
  // GitHub Repository - Exercise
  //const [projects, setProjects] = useState({});
  //const [fetchState, setFetchState] = useState("idle")

  const [projects, dispatch] = useFetch()

  /*
  const projects = [
    {
      name: 'DEMO',
      description: 'DEMO',
      stargazerCount: 12,
      url: 'https://github.com',
      homepageUrl: 'https://github.com',
    },
  ];

   */

  useEffect(() => {
    console.log("projets")
    fetch(getListOfUrlRepositoriesUrl(GITHUB_USERNAME)).then((res) => {

      dispatch({type:FETCH_ACTIONS.PENDING})
      return res.json()
    }).then((data) => {
      if(data) {
       dispatch({type:FETCH_ACTIONS.RESOLVED, data})
      }
    }).catch((err) => {
      dispatch({type:FETCH_ACTIONS.REJECTED})
      console.log(err)
    })
  }, [])

  useEffect(() => {
    console.log(projects)
  }, [projects])

  return (
    <SectionWrapper title="Projects">
      <div className="flex flex-wrap justify-center gap-8">
        {/* GitHub Repository - Exercise (replace this) */}
        {projects.status === FETCH_ACTIONS.RESOLVED
            ? projects.data.map((project) => {
              return <Project key={project.url} {...project} />
            })
            : <Loader/>
        }

      </div>
    </SectionWrapper>
  );
};
