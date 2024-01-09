import React, { useEffect } from "react";
import { Layout } from "../../../../layout";
import { useLazyGetMentorByIdQuery } from "../../../../app/api";
import { useParams } from "react-router-dom";
import { PageTitle } from "../../../../component";

export const MentorDetailsPage = () => {
     const { mentorId } = useParams();
     const [GetMentor, { data: mentor, isError: isMentorError, isFetching: isMentorLoading, error: mentorError }] =
          useLazyGetMentorByIdQuery();

     useEffect(() => {
          if (mentorId) {
               (async () => {
                    await GetMentor(mentorId);
               })();
          }
          if (isMentorError) {
               console.log(mentorError);
          }
     }, [mentorId, isMentorError, mentorError, GetMentor]);

     return (
          <Layout pageTitle={`${mentor?.data.name.firstName} ${mentor?.data.name.lastName} details`}>
               {isMentorLoading && (
                    <div className="flex flex-col h-[400px] justify-center items-center">
                         <p className="text-gray-500 uppercase text-2xl animate-pulse">Getting mentor details</p>
                    </div>
               )}
               {!isMentorLoading && (
                    <div>
                         <PageTitle title={`${mentor?.data.name.firstName} ${mentor?.data.name.lastName} details`} />
                    </div>
               )}
          </Layout>
     );
};
