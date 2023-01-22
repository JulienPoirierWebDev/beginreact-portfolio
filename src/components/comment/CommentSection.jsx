import { SectionWrapper } from '../atom/SectionWrapper';
import { Comment } from './Comment';
import { CommentForm } from './CommentForm';
import {FETCH_ACTIONS, useFetch} from "../../hooks/useFetch";
import {commentsUrl} from "../../lib/api-url";
import {useEffect} from "react";
import {Loader} from "../atom/Loader";
import {Typography} from "../atom/Typography";

export const CommentSection = () => {
  // Commentaires - Exercise
  const {data, status, error, run} = useFetch(commentsUrl)

  return (
    <SectionWrapper title="On est à l'époque de FaceBook ?">
      <div className="flex flex-col items-center w-full max-w-2xl gap-8 m-auto ">
        <div className="grid justify-center w-full gap-4 grid-cols-auto-fill-200-300">
          {/* Commentaires - Exercise */}
          {(status === FETCH_ACTIONS.PENDING || status === FETCH_ACTIONS.PENDING)
          ? <Loader/>
          :null}
          {status === FETCH_ACTIONS.RESOLVED
            ? data?.map((element) => <Comment key={element.id} {...element} />)
          : null}
          {status === FETCH_ACTIONS.REJECTED ?
              <Typography>{error}</Typography>
          : null}
        </div>
        <CommentForm updateComments={run}/>
      </div>
    </SectionWrapper>
  );
};
