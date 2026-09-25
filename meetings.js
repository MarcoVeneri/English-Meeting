// Fictional public-sector and healthcare projects. No real client or patient data.
const meetingCases=[
{
 title:'A new healthcare project', it:'Avvio progetto sanitario e organizzazione del team',
 context:'a new appointment service for a local health authority',
 update:'We have eleven people on the team. Two people are checking the requirements. The others are preparing the design and the test environment.',
 problem:'The client has not confirmed who can approve the requirements.',
 impact:'We can prepare the design, but we should not start building features that may change.',
 question:'Can we ask the service manager to join a short call?',
 answer:'Yes. She is available tomorrow morning. She can confirm the approval process and name the right person.',
 proposal:'Let us use today to collect the open questions. We will agree the approval process tomorrow, before development starts.',
 concern:'That works. But the team also needs to know which feature comes first.',
 decision:'The appointment search comes first. Email reminders can come later. I will check that priority with the service manager.',
 action:'I will prepare a one-page list of questions and send it to you by four today.',
 leadAction:'I will book the call for ten tomorrow and ask the service manager to confirm an owner.',
 result:'The service manager joined the call. She confirmed that she will approve the requirements. She also agreed that appointment search comes first.',
 remaining:'We still need two examples of appointment types from the client.',
 next:'I will request the examples today. The team can finish the search design while we wait.',
 checkpoint:'Let us check the examples at our next daily meeting. We will start development after the requirements are approved.'
},
{
 title:'The booking screen is late',it:'Ritardo su una funzionalità e revisione della scadenza',
 context:'the booking screen for a hospital appointment service',
 update:'The search page is ready. The booking screen is still in development. We planned to finish it on Thursday.',
 problem:'The team found two different rules for booking a follow-up visit.',
 impact:'If we choose the wrong rule, staff may book visits that the service cannot provide.',
 question:'Could we release the search page first and keep booking in the test environment?',
 answer:'Yes. Search works on its own. We can show it to the client without allowing anyone to make a real booking.',
 proposal:'Let us keep the demonstration on Thursday, but show search only. We should move the booking review to Monday.',
 concern:'I can support that. Will the client think we have changed the full release date?',
 decision:'I will explain that this is a change to the demonstration. The production date is still under review, and we will confirm it after testing.',
 action:'I will ask the analyst to compare the two rules and send the question to the booking manager before lunch.',
 leadAction:'I will tell the client today what we can demonstrate and what still needs a decision.',
 result:'The booking manager confirmed the correct rule. The team updated the design, and the search demonstration went well.',
 remaining:'The booking screen still needs a full test with a follow-up visit.',
 next:'I will ask the tester to run that case on Monday morning and record the result.',
 checkpoint:'We will review the test result on Monday afternoon before we agree a production date.'
},
{
 title:'A missing test environment',it:'Dipendenza dal cliente e ambiente di test',
 context:'a new online application service for a municipality',
 update:'The application form is ready for testing. Our developers have completed their checks.',
 problem:'The client has not opened access to the shared test environment.',
 impact:'Our testers cannot check the connection to the document system. This could delay the client review by two days.',
 question:'Can we use a temporary connection for the first tests?',
 answer:'We can use a simulated connection to check our own code. However, that will not prove that the real document system works.',
 proposal:'Let us run the internal tests today and keep the connection test open. We need a clear date for access.',
 concern:'Who should contact the client? We sent an email yesterday but did not get a reply.',
 decision:'I will call their environment owner. If we do not have a date by three, I will raise the dependency with the client project manager.',
 action:'I will give you the exact access requirements and continue the internal tests this morning.',
 leadAction:'I will call the environment owner before noon and update the delivery plan after the call.',
 result:'The client opened access late yesterday. The testers can now reach the shared environment.',
 remaining:'One connection to the document system is still failing. We have not completed the end-to-end test.',
 next:'I will send the error details to the client technical team and ask them to check the connection settings.',
 checkpoint:'Let us review the result tomorrow at ten. We will confirm the client review date after that test passes.'
},
{
 title:'Checking migrated records',it:'Migrazione dati, qualità e criteri di accettazione',
 context:'moving service records into a new public-sector system',
 update:'We have completed the first test migration using sample data. Most records arrived correctly.',
 problem:'Some older records do not have a valid service code.',
 impact:'Those records cannot be assigned to the correct service. We should not guess the missing values.',
 question:'Do we know how many records need a decision from the client?',
 answer:'Yes. There are forty in the sample. I have put them in a separate exception report.',
 proposal:'Let us send the exception report to the data owner and ask for a rule for each type of missing code.',
 concern:'Can the rest of the team continue, or does everyone have to wait?',
 decision:'The team can test the valid records. The exception records must stay outside the accepted set until the data owner confirms the rules.',
 action:'I will send the report through the agreed secure channel by two today, using record references rather than personal details in the email.',
 leadAction:'I will arrange a review with the data owner for tomorrow and record the acceptance criteria.',
 result:'The data owner supplied a mapping for most of the missing codes. We applied it to a fresh test migration.',
 remaining:'Five sample records still have no agreed destination. They remain in the exception report.',
 next:'I will ask the data owner to review those five references and confirm the expected result.',
 checkpoint:'We will compare the totals after the next test run. We will not approve the migration while unexplained differences remain.'
},
{
 title:'Too much work for the team',it:'Capacità del team di undici persone e priorità',
 context:'planning the next week for an eleven-person delivery team',
 update:'The team is working on the patient portal and two smaller public-sector services. Two people will be on leave next week.',
 problem:'We have more planned tasks than the remaining team can complete.',
 impact:'If we keep every task in the plan, testing will be rushed and people will work on too many things at once.',
 question:'Which activities are essential for the next release?',
 answer:'The login fix and the accessibility checks are essential. The new management report is useful, but it is not needed for the release.',
 proposal:'Let us move the management report to the following week and protect time for testing.',
 concern:'The client asked for the report in the last meeting. Can we move it without telling them?',
 decision:'No. I will explain the capacity limit and ask them to confirm the priority. We should agree the change before updating the commitment.',
 action:'I will prepare a realistic plan with owners and estimates by this afternoon.',
 leadAction:'I will review the options with the client at four and confirm the agreed scope to the team.',
 result:'The client agreed to move the management report. The revised plan gives the team enough time for the essential checks.',
 remaining:'One tester may still need support with accessibility checks.',
 next:'I will pair the tester with a colleague who knows the service, for two hours tomorrow.',
 checkpoint:'Let us check capacity again on Wednesday. If new work arrives, we will discuss what moves out of the plan.'
},
{
 title:'An extra client request',it:'Richiesta fuori perimetro e gestione del cambiamento',
 context:'a citizen portal that is approaching its first release',
 update:'The agreed features are almost ready. The client has now asked for text-message notifications as well as email.',
 problem:'Text messages were not included in the agreed scope. We also need a connection to an external provider.',
 impact:'Adding them now would need more development, supplier setup and testing. It could put the release date at risk.',
 question:'Is the new feature essential for the first release?',
 answer:'The service manager says it is helpful, but citizens can still use the service with email notifications.',
 proposal:'Let us estimate the change separately and offer it as a second release.',
 concern:'What if the client asks us to include it anyway and keep the same date?',
 decision:'We will show the impact and discuss options. We cannot promise extra work with no change to time or scope.',
 action:'I will prepare a short estimate, including the provider dependency, by tomorrow afternoon.',
 leadAction:'I will discuss the options with the client and request a formal decision before the team starts the new work.',
 result:'The client agreed to keep email notifications in the first release and review text messages for the next one.',
 remaining:'The cost and setup time for the external provider are still unknown.',
 next:'I will request those details so the second-release estimate includes the full dependency.',
 checkpoint:'We will review the estimate with the client next week. The current team will continue with the agreed first release.'
},
{
 title:'A defect before release',it:'Problema nei test e decisione sul rilascio',
 context:'the final tests of a healthcare staff portal',
 update:'Most acceptance tests have passed. The release is planned for tomorrow evening.',
 problem:'A test user can see a document that belongs to a different test role.',
 impact:'The access rules may be wrong. We cannot treat this as a small visual defect.',
 question:'Can we hide the document link and release the rest?',
 answer:'Hiding the link is not enough. We need to check that the system blocks access on the server as well.',
 proposal:'Let us pause the release decision until the access problem is fixed and retested.',
 concern:'The service manager is expecting a confirmation this afternoon. What should we say?',
 decision:'We should explain the issue clearly and say that the release is not approved yet. Protecting access is more important than keeping an unsafe date.',
 action:'I will ask the technical owner to investigate now and give us an update at two.',
 leadAction:'I will inform the service manager and arrange a release review after the test team has evidence.',
 result:'The technical team fixed an incorrect access rule. The original failing test now passes.',
 remaining:'We still need to repeat the tests for the other roles. One passing test is not enough to approve the release.',
 next:'I will ask the test team to complete the role checks and attach the results to the release record.',
 checkpoint:'We will make the release decision only after the checks are complete and the authorised owner has reviewed the evidence.'
},
{
 title:'A service interruption',it:'Incidente operativo e comunicazione al cliente',
 context:'an interruption to an online municipal payment service',
 update:'The support team reported an increase in failed payment attempts this morning. The technical team is investigating.',
 problem:'The payment provider is responding very slowly. We do not yet know whether every failed attempt was charged.',
 impact:'Citizens may try to pay again. We need to avoid giving them advice that could lead to duplicate payments.',
 question:'Should we tell users to keep trying until the payment works?',
 answer:'No. We should wait for the provider to confirm transaction status and use the agreed service message.',
 proposal:'Let us coordinate with the incident manager and give the client a factual update every thirty minutes.',
 concern:'Can we promise that the service will be back within an hour?',
 decision:'We do not have evidence for that. We will state what we know, what is being checked and when the next update will arrive.',
 action:'I will work with the provider and send confirmed technical facts to the incident manager.',
 leadAction:'I will keep the client informed and make sure the incident team has a clear owner for each action.',
 result:'The provider restored normal response times. New test transactions are completing successfully.',
 remaining:'The support team still needs to reconcile the earlier failed attempts before closing the incident.',
 next:'I will help the support team compare the affected transaction references with the provider records.',
 checkpoint:'We will keep the incident open until reconciliation is complete. Then we will arrange a short review of the cause and the follow-up actions.'
},
{
 title:'Preparing client acceptance',it:'Test di accettazione e disponibilità degli utenti',
 context:'client acceptance testing for a regional case-management service',
 update:'The software is ready for the agreed acceptance tests. We have prepared the test steps and the expected results.',
 problem:'Only one of the three client users is available this week.',
 impact:'One user cannot check all the service roles. We may not get complete acceptance evidence by Friday.',
 question:'Can our own testers sign off on behalf of the missing client users?',
 answer:'They can support the tests, but they cannot replace the client approval required by the agreement.',
 proposal:'Let us run the available role tests now and ask the client to nominate two replacement users.',
 concern:'Will the replacement users understand the process well enough?',
 decision:'We will ask for experienced users and give them a short briefing. If the client cannot provide them, we need to agree a new acceptance date.',
 action:'I will prepare the briefing and identify which test cases need each role by noon.',
 leadAction:'I will contact the client project manager today and ask for named users and confirmed availability.',
 result:'The client nominated two experienced users. They completed the briefing and started their tests.',
 remaining:'One test failed because the expected business rule is not clear to everyone.',
 next:'I will ask the analyst and the client process owner to agree the expected result before we repeat that test.',
 checkpoint:'We will record the result and the client decision. Acceptance will remain open until all required checks are complete.'
},
{
 title:'The weekly steering update',it:'Sintesi per il comitato di progetto e decisioni',
 context:'preparing a steering-committee update for a public-sector programme',
 update:'Three workstreams are on plan. The integration workstream is at risk because we are waiting for an external interface.',
 problem:'The external team has not committed to a delivery date for that interface.',
 impact:'Without it, we cannot complete the integrated test. The current release date is uncertain.',
 question:'Should we show the programme as green because most workstreams are on time?',
 answer:'No. The integration is on the critical path. A green status would hide the risk to the overall date.',
 proposal:'Let us show an amber status and explain the dependency, its impact and the decision we need.',
 concern:'What exactly should we ask the steering group to do?',
 decision:'We need their help to secure a named owner and a committed interface date. If that is not possible, we need agreement on a revised release plan.',
 action:'I will provide the latest technical facts and the two delivery options before three today.',
 leadAction:'I will prepare a short steering update with the recommendation and the specific request for support.',
 result:'The steering group assigned an owner to the external dependency. The interface is now expected next Wednesday.',
 remaining:'That date is a commitment, but the interface has not been delivered or tested yet.',
 next:'I will arrange a technical checkpoint with the external owner and prepare the integration tests.',
 checkpoint:'We will keep the programme amber until the interface is available and the tests support the revised delivery plan.'
},
{
 title:'A UK and US project call',it:'Collaborazione internazionale, chiarimenti e fusi orari',
 context:'a joint UK and US team preparing a healthcare service demonstration',
 update:'The UK team has finished the demonstration script. The US team is preparing the integration example.',
 problem:'The meeting invitation says nine oclock, but it does not clearly state the time zone.',
 impact:'Some colleagues may join at the wrong time. The client could see an incomplete demonstration.',
 question:'When you say nine oclock, do you mean London time or the US team local time?',
 answer:'London time. That is too early for our US colleagues. We need a time both teams can attend.',
 proposal:'Let us find an afternoon slot in London and include the time zones in the invitation.',
 concern:'I may not understand every detail of the integration example. Can we have a short rehearsal first?',
 decision:'Yes. We will have a rehearsal the day before. Please stop us and ask for clarification whenever a point is unclear.',
 action:'I will check the US team availability and share the integration example before the rehearsal.',
 leadAction:'I will update the invitation with an agreed time and send a short agenda with the demonstration order.',
 result:'Both teams accepted the new invitation. The rehearsal helped us find a gap between the two parts of the demonstration.',
 remaining:'We need a simple explanation of how the user moves from the portal to the integration screen.',
 next:'I will add that transition to the script and ask a colleague to check that the wording is clear.',
 checkpoint:'We will run through the transition once more before the client call. Each team now knows when to speak and what to show.'
},
{
 title:'Handover to the support team',it:'Passaggio in esercizio e responsabilità operative',
 context:'handing over a new local-health service to the support team',
 update:'The release has passed its checks. We have prepared the support guide and the contact list.',
 problem:'The support team has not practised the recovery procedure yet.',
 impact:'If the service fails outside normal hours, the team may not know how to restore it safely.',
 question:'Can we send them the guide and close the handover today?',
 answer:'The guide is useful, but it does not show that they can use the procedure. We need a practical exercise in the test environment.',
 proposal:'Let us arrange the exercise tomorrow and keep the handover open until the support team confirms readiness.',
 concern:'Who will be available if the support team has questions after the release?',
 decision:'We will agree a named delivery contact for the initial support period and a clear escalation route. Support will remain the first point of contact.',
 action:'I will prepare the exercise and check that the support team has the required test access.',
 leadAction:'I will agree the initial support arrangements with the service owner and document the responsibilities.',
 result:'The support team completed the exercise and restored the test service successfully.',
 remaining:'One contact number in the support guide was out of date. We need to correct it before handover closes.',
 next:'I will verify the contact list with the service owner and send the updated guide to support.',
 checkpoint:'We will ask support to confirm receipt and readiness. Then we can close the handover and start the agreed initial support period.'
}
];
// Everyday opening exchanges are part of each meeting, not isolated phrase drills.
const meetingOpenings=[
[
 ["Emma, it is lovely to see you again. It has been a few weeks. How have you been?","I have been well, thanks. It has been a busy month, but things are a little quieter now. How about you?","Very well, thank you. We have had a lot of rain here in London. What is the weather like where you are?","It is warm and sunny here in Houston. I went for a walk before work this morning.","That sounds nice. I hope we get some sunshine this weekend. Shall we make a start?","Yes, of course. I have the project update ready."],
 ["Hi Emma. Good to see you again. Is it still sunny in Houston?","Yes, although it is a little cooler today. Did the rain finally stop in London?","For now, yes. I managed to walk to the office without an umbrella. Shall we check our open actions?","Absolutely. I have some progress to share."]
],
[
 ["Hi Emma. How are you? Did you have a good weekend?","I did, thanks. I met some friends for lunch on Saturday. We had not seen each other for a while. How was yours?","Quiet, which was exactly what I needed. I spent some time outside on Sunday.","That sounds good. It is nice to have a break from the computer.","It certainly is. Right, shall we look at the booking service?","Yes. There is one timing issue I would like to discuss."],
 ["Morning, Emma. How is your week going so far?","Quite well, thanks. Busy, but better organised than last week. How about yours?","Much the same. Let us see where we are with the booking work.","Yes, I have the latest update in front of me."]
],
[
 ["Hello, Emma. Are you in the office today or working from home?","I am at home today. I usually go into the office twice a week. What about you?","I am in the office. The train was delayed this morning, so it took longer than usual.","Oh, that is frustrating. Was it very crowded?","Yes, but I found a seat in the end. Anyway, I am here now. Shall we start?","Yes. Let us look at what is holding up the tests."],
 ["Hi Emma. Nice to see you. I made it to the office on time today.","That is good news. No train delays this time?","None today, thankfully. Now, how are things with the project?","Let me take you through the latest progress."]
],
[
 ["Emma, welcome back. How was your time off?","Really good, thank you. I spent a few days by the sea and tried not to check my work email.","That sounds like a proper break. Was the weather good?","Mostly sunny. We had one rainy afternoon, but we found a nice cafe and stayed there for a while.","Lovely. I hope your first day back is not too busy. Shall we go through the migration together?","Thank you. Yes, that would help me get back up to speed."],
 ["Hi Emma. Are you feeling back in the routine after your break?","Yes, nearly. I have caught up with most of my messages now.","Good. Let us keep this call focused so you have time for the rest.","Thanks. I have a short update on the migration."]
],
[
 ["Hi Emma. How are things with you? You sounded very busy on our last call.","I was, but this week feels a bit more manageable. I am trying to take a proper lunch break each day.","That is a good idea. It is easy to sit at the desk all day when you work from home.","Exactly. Even a short walk helps. Have you managed to get outside today?","Not yet, but I will after this call. First, let us check the team workload.","Yes. We need to make sure the plan is realistic."],
 ["Hello again, Emma. Did you manage to take your lunch break today?","I did. I went for a short walk. It helped me clear my head.","Glad to hear it. Let us review the plan while we are both fresh.","Good idea. There has been a useful change since our last call."]
],
[
 ["Hello, Emma. It has been a while since our last project together. How are you doing?","Very well, thanks. It is good to work with you again. Are you still based in London?","Yes, I am. I travel a little less now, which is nice. Are you still in Houston?","Yes. I sometimes miss seeing the team in person, but the remote calls work well.","I know what you mean. Hopefully we can meet at a team event. Shall we get started?","Yes. I wanted to talk about a new request from the client."],
 ["Hi Emma. Nice to see you again. Has it been a busy morning?","A little, but I have kept this time free for our review.","Thank you. Let us start with the client request.","Sure. I have their latest response."]
],
[
 ["Morning, Emma. Can you hear me clearly?","Yes, very clearly. It is good to see you. How are you today?","I am fine, thanks. It is quite cold here this morning. What is it like where you are?","Much warmer. I think we have your sunshine today.","It sounds like it. I will try not to be jealous. Shall we review the test results?","Yes. There is an important issue we should discuss first."],
 ["Hi Emma. Thanks for making time for another call. How are you holding up?","I am okay, thanks. It has been a demanding day, but the team has been very supportive.","I am glad to hear that. Let us look at the evidence together.","Yes. I will explain what has changed and what is still open."]
],
[
 ["Hi Emma. Thanks for joining at short notice. Are you doing okay?","Yes, thanks for asking. It has been a busy morning, but I have the incident notes ready.","All right. We will keep this short and focus on what you need.","Thank you. That would be helpful."],
 ["Hello, Emma. Before we start, have you had a chance to take a break?","Yes, I have. A colleague covered the update while I had lunch.","Good. Thank you for keeping everyone informed. Shall we review the current situation?","Yes. Things are more stable now, but there is still work to finish."]
],
[
 ["Hi Emma. How was your trip last week?","It went well, thank you. It was nice to meet the client team in person.","Did you get any time to see the city, or was it all meetings?","Mostly meetings, but I had a short walk on the last evening. It was a pleasant change from sitting in a meeting room.","I can imagine. Right, let us talk about the next step with the client users.","Yes. We need to confirm who can take part in testing."],
 ["Hi Emma. Are you back at your usual desk now?","Yes, and it is nice not to be travelling this week. How are you?","Well, thanks. I have a quieter afternoon, so we have time to work through the open point.","Great. Let us start with the acceptance tests."]
],
[
 ["Hi Emma. Good to see you. Have you got any plans for the weekend?","Nothing complicated. I am hoping to spend some time outside if the weather stays dry. What about you?","I may visit some friends. We have been trying to arrange it for weeks.","That sounds nice. I hope you manage to find a time that works.","Thanks. Before the weekend arrives, we need to finish our steering update. Shall we look at it?","Yes. I have the workstream status ready."],
 ["Hello, Emma. How has your day been?","Good, thanks. I have just finished another call, so I am ready for this one.","Thanks for joining straight away. We can keep this to the main decisions.","Perfect. I have the outcome from the steering meeting."]
],
[
 ["Hello, Emma. It is good to see you. I hope this is not too early for you.","It is a little early here, but that is fine. I have my coffee ready. Is it afternoon in London already?","Yes, it is. I have just had lunch. What is the weather like in Houston today?","Warm, but there is a chance of rain later. What about London?","Cloudy as usual. Anyway, thanks for fitting us in. Let us check the demonstration plan.","Of course. We should also confirm the timing of the next call."],
 ["Hi Emma. Does this meeting time work better for you?","Yes, much better, thank you. I have had time to speak with the team before joining.","Excellent. It helps if everyone has time to prepare.","Definitely. Let us review what we learned in the rehearsal."]
],
[
 ["Emma, it is good to see you again. We have mostly been talking by email recently. How have you been?","I have been well, thanks. It is nice to have a proper conversation. How are things with you?","Good. It has been a full few weeks, but I am looking forward to a quieter weekend.","Same here. Sometimes having no plans is the best plan.","I agree. Let us make sure the support team has everything it needs before we finish the week.","Yes. I have the handover checklist ready."] ,
 ["Hi Emma. How are you feeling about the handover now?","Better, thanks. The practical session helped, and it was good to meet the support colleagues.","That is good. Knowing the people makes future calls easier too.","Absolutely. Let us go through the last open item."]
]
];
function meetingTurns(c,followup=false){
 const turn=(speaker,text)=>({speaker,locale:speaker==='Emma'?'en-US':'en-GB',text});
 const opening=meetingOpenings[meetingCases.indexOf(c)][followup?1:0].map((text,i)=>turn(i%2===0?'Sarah':'Emma',text));
 if(followup)return [
 turn('Narrator',`This is a follow-up meeting about ${c.context}. Sarah is the delivery lead. Emma is the technical lead. They will check the actions from their previous meeting.`),
 ...opening,
 turn('Sarah',`Before we look at the new update, could you remind me what was blocking us?`),
 turn('Emma',c.problem),
 turn('Sarah',`Right. We agreed the following approach. ${c.proposal}`),
 turn('Emma',`Yes. There has been some progress since that decision. ${c.result}`),
 turn('Sarah',`That is useful progress. Does it mean we can close this point now, or is something still open?`),
 turn('Emma',c.remaining),
 turn('Sarah',`Thanks for making that clear. I want the client update to show what is complete and what still needs attention. What will you do next?`),
 turn('Emma',c.next),
 turn('Sarah',`Do you need another person to make a decision, or can your team complete the next step?`),
 turn('Emma',`I can coordinate the work. If we need a client decision, I will send you the question and explain the impact. I will not make assumptions on their behalf.`),
 turn('Sarah',`Good. Please send me a short update by the end of today. Include the result, the open point and the person responsible.`),
 turn('Emma',`I will. If something changes before then, I will let you know earlier.`),
 turn('Sarah',c.checkpoint),
 turn('Emma',`Understood. I own the technical follow-up. You will coordinate the client decision and the delivery plan.`),
 turn('Sarah',`Exactly. We have a clear next step and a checkpoint. Thank you, Emma. Let us close the meeting here.`)
 ];
 return [
 turn('Narrator',`You are listening to a project meeting about ${c.context}. Sarah is the delivery lead. Emma is the technical lead. First, they have a short personal catch-up. Then listen for the problem, the decision and who will do what next.`),
 ...opening,
 turn('Sarah',`Let us look at the work now. I would like to understand progress, discuss any blockers and agree the next actions. Could you start with a short update?`),
 turn('Emma',c.update),
 turn('Sarah',`Thank you. What is the main point that needs our attention today?`),
 turn('Emma',c.problem),
 turn('Sarah',`I see. Could you explain what that means for the service or the delivery plan?`),
 turn('Emma',c.impact),
 turn('Sarah',c.question),
 turn('Emma',c.answer),
 turn('Sarah',c.proposal),
 turn('Emma',c.concern),
 turn('Sarah',c.decision),
 turn('Emma',`That makes sense. Let us confirm the owners so the team knows what to do.`),
 turn('Sarah',`Agreed. What can you take forward, and when will you send an update?`),
 turn('Emma',c.action),
 turn('Sarah',c.leadAction),
 turn('Emma',`Before we finish, can I check my understanding? I will coordinate the technical work. You will handle the client discussion and confirm any change to the plan.`),
 turn('Sarah',`That is correct. Please raise any new blocker as soon as you find it. Do not wait until the next scheduled meeting.`),
 turn('Emma',`Understood. I will keep the update short and include the evidence we have, not just an estimate of progress.`),
 turn('Sarah',`Thank you. I will record our decision and the action owners. We have a plan, so let us give the team time to work. Speak to you at the next checkpoint.`)
 ];
}
function meetingPlaylist(studyDay,sessionMode){
 const start=(studyDay-1)%meetingCases.length;
 const firstFollowup=sessionMode==='evening';
 const list=[];
 for(let pass=0;pass<2;pass++)for(let n=0;n<meetingCases.length;n++){
  const c=meetingCases[(start+n)%meetingCases.length];
  const followup=pass===0?firstFollowup:!firstFollowup;
  list.push({name:c.title+(followup?' · Follow-up':''),locale:'en-GB',lines:meetingTurns(c,followup),followup});
 }
 return list;
}
