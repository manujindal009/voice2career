import { useNavigate, useSearchParams } from "react-router-dom";
import {Folder,FolderOpen,BookOpen,FileText,Download,ArrowLeft,CloudCog,Database,Brain,Files,Target,} from "lucide-react";
import { url } from "inspector"
/* ================= TYPES ================= */
type FileItem = {
  title: string;
  url: string;
};
type SubFolder = {
  name: string;
  files: FileItem[];
};type FolderType = {
  name: string;
  icon: JSX.Element;
  subfolders: SubFolder[];
};
/* ================= DATA ================= */
const DATA: Record<string, FolderType> = {
  aptitude: {
    name: "Aptitude",
    icon: <BookOpen className="h-6 w-6 text-indigo-600" />,
    subfolders: [
      {
        name: "Puzzles",
        files: [
          {
            title: "400 Puzzles",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/aptitude/Aptitude/Puzzles/400-Puzzles.pdf",
          },
          {
            title: "How will tou move mount fuji",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/aptitude/Aptitude/Puzzles/400-Puzzles.pdf",
          },
          {
            title: "Timothy Falcon Crack",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/aptitude/Aptitude/Puzzles/Timothy%20Falcon%20Crack%20-%20Heard%20on%20the%20Street%2C%20Quantitative%20Questions%20from%20Wall%20Street%20Job%20Interviews-Timothy%20Crack%20(2014).pdf",
          },
        ],
      },
      {
        name: "Formulas",
        files: [
          {
            title: "Quant Formulas",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/aptitude/Aptitude/Formulas%20PDF/Formulae_Quant.pdf",
          },
          {
            title: "Basics of Quantitavive Aptitude",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/aptitude/Aptitude/Formulas%20PDF/Basics%20of%20Quantitative%20Ability.pdf",
          },
        ],
      },
       {
        name: "Guesstimates",
        files: [
          {
            title: "Case in point 7th edition",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/aptitude/Aptitude/Guesstimates/Case-In-Point-7th-Edition1.pdf",
          },
          {
            title: "Guesstimates",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/aptitude/Aptitude/Guesstimates/Guestimates.docx",
          },
        ],
      },
      {
        name: "Verbal Ability",
        files: [
          {
            title: "Basics of Verbal Ability",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/aptitude/Aptitude/Verbal%20Ability/Basics%20of%20Verbal%20Ability.pdf",
          },
          {
            title: "Verbal Ability",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/aptitude/Aptitude/Verbal%20Ability/VerbalAbility.pdf",
          },
          {
            title: "Princeton-1014",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/aptitude/Aptitude/Verbal%20Ability/Princeton-1014.pdf",
          },
        ],
      },
      { name: "Data Interpretation", files: [{
            title: "Aptitude and Paragraph 1",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/aptitude/Aptitude/Data%20Interpretation/Aptitude%20and%20Paragraph%201.pdf",
          },
        
{
            title: "Aptitude and Paragraph 2",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/aptitude/Aptitude/Data%20Interpretation/Aptitude%20and%20Paragraph%202.pdf",
          },
{
            title: "Data Interpretation 1",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/aptitude/Aptitude/Data%20Interpretation/Data%20Interpretation%201.pdf",
          },
          {
            title: "Data Interpretation 2",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/aptitude/Aptitude/Data%20Interpretation/Data%20Interpretation%202.pdf",
          },
          {
            title: "Data Interpretation 3",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/aptitude/Aptitude/Data%20Interpretation/Data%20Interpretation%203.pdf",
          },
        ],},
      { name: "Quantitative", files: [
          {
            title: "Quantative Aptitude Question Set 1",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/aptitude/Aptitude/Quantitative%20Aptitude/Quantitative%20Apti%20QuestionSet1.pdf",
          },
          {
            title: "Quantative Aptitude Question Set 2",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/aptitude/Aptitude/Quantitative%20Aptitude/Quantitative%20Apti%20QuestionSet2.pdf",
          },
          {
            title: "Quantative Aptitude Question Set 3",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/aptitude/Aptitude/Quantitative%20Aptitude/Quantitative%20Apti%20QuestionSet3.pdf",
          },
          {
            title: "Quantative Aptitude Question Set 4",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/aptitude/Aptitude/Quantitative%20Aptitude/Quantitative%20Apti%20QuestionSet4.pdf",
          },
          {
            title: "Quantative Aptitude Question Set 5",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/aptitude/Aptitude/Quantitative%20Aptitude/Quantitative%20Apti%20QuestionSet5.pdf",
          },
          {
            title: "Quantative Aptitude Question Set 6",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/aptitude/Aptitude/Quantitative%20Aptitude/Quantitative%20Apti%20QuestionSet6.pdf",
          },
          {
            title: "Quantative Aptitude Question Set 7",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/aptitude/Aptitude/Quantitative%20Aptitude/Quantitative%20Apti%20QuestionSet7.pdf",
          },
          {
            title: "Quantative Aptitude Question Set 8",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/aptitude/Aptitude/Quantitative%20Aptitude/Quantitative%20Apti%20QuestionSet8.pdf",
          },
          {
            title: "RS Aggarwal",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/aptitude/Aptitude/Quantitative%20Aptitude/RS%20Aggarwal.pdf",
          },
          {
            title: "Fifty Challenging Problems",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/aptitude/Aptitude/Quantitative%20Aptitude/fifty_challenging_problems_in__2.pdf",
          },
      ] },
      
    ],
  },

  dsa: {
    name: "DSA",
    icon: <FolderOpen className="h-6 w-6 text-blue-600" />,
    subfolders: [
      { name: "DSA in C", files: [
        {
            title: "Basic Data structures {IMPORTANT}",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20C/Basic%20Data%20structures%20%7BIMPORTANT%7D.pdf",
          },
          {
            title: "C Programming DSA",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20C/C%20Programming%20DSA.pdf",
          },
          {
            title: "Cheat_CODE_Book_By_GFG",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20C/Cheat_CODE_Book_By_GFG.pdf",
          },
          {
            title: "Complete_DSA_Guide_ROADMAP",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20C/Complete_DSA_Guide_ROADMAP.pdf",
          },
          {
            title: "DATA STRUCTURE AND ALGORITHMS",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20C/DATA%20STRUCTURE%20AND%20ALGORITHMS.pdf",
          },
          {
            title: "DSA CheatSheet",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20C/DSA%20CheatSheet.pdf",
          },
          {
            title: "IMPORTANT DSA cheatsheet",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20C/IMPORTANT%20DSA%20cheatsheet.pdf",
          },
          {
            title: "Learn DSA in 100 days",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20C/Learn%20DSA%20in%20100%20days.pdf",
          },
          {
            title: "dsa cheatsheet",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20C/dsa%20cheatsheet%20.pdf",
          },

      ] },
      { name: "DSA in C++", files: [
        {
            title: "Basic Data structures {IMPORTANT}",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20C%2B%2B/Basic%20Data%20structures%20%7BIMPORTANT%7D.pdf",
          },
          {
            title: "C++ Data Structures and Algorithms Cheat Sheet",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20C%2B%2B/C%2B%2B%20Data%20Structures%20and%20Algorithms%20Cheat%20Sheet.pdf",
          },
          {
            title: "Cheat_CODE_Book_By_GFG",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20C%2B%2B/Cheat_CODE_Book_By_GFG.pdf",
          },
          {
            title: "Competitive Programming ACM ICPC and IOI handbook",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20C%2B%2B/Competitive%20Programming%20ACM%20ICPC%20and%20IOI%20handbook.pdf",
          },
          {
            title: "Competitive Programming Handbook",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20C%2B%2B/Competitive%20Programming%20Handbook.pdf",
          },
          {
            title: "Complete_DSA_Guide_ROADMAP(1)",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20C%2B%2B/Complete_DSA_Guide_ROADMAP(1).pdf",
          },
          {
            title: "Complete_DSA_Guide_ROADMAP(2)",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20C%2B%2B/Complete_DSA_Guide_ROADMAP.pdf",
          },
          {
            title: "DATA STRUCTURE AND ALGORITHMS",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20C%2B%2B/DATA%20STRUCTURE%20AND%20ALGORITHMS.pdf",
          },
          {
            title: "DSA CheatSheet",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20C%2B%2B/DSA%20CheatSheet.pdf",
          },
          {
            title: "Dynamic Programming",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20C%2B%2B/Dynamic%20Programming%20Part%20-2%20by%20Kapil%20Yadav.pdf",
          },
          {
            title: "IMPORTANT DSA cheatsheet",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20C%2B%2B/IMPORTANT%20DSA%20cheatsheet.pdf",
          },
          {
            title: "Learn DSA in 100 days",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20C%2B%2B/Learn%20DSA%20in%20100%20days.pdf",
          },
          {
            title: "SORTING ALGORITHMS",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20C%2B%2B/SORTING%20ALGORITHMS.pdf",
          },
          {
            title: "dsa cheatsheet",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20C%2B%2B/dsa%20cheatsheet%20.pdf",
          },

      ] },
      { name: "DSA in Python", files: [{
            title: "Basic Data structures {IMPORTANT}",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20Python/Basic%20Data%20structures%20%7BIMPORTANT%7D.pdf",
          },
          {
            title: "Complete_DSA_Guide_ROADMAP",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20Python/Complete_DSA_Guide_ROADMAP.pdf",
          },
          {
            title: "Copy of Cheat_CODE_Book_By_GFG",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20Python/Copy%20of%20Cheat_CODE_Book_By_GFG.pdf",
          },
          {
            title: "DATA STRUCTURE AND ALGORITHMS",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20Python/DATA%20STRUCTURE%20AND%20ALGORITHMS.pdf",
          },
          {
            title: "DSA CheatSheet",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20Python/DSA%20CheatSheet.pdf",
          },
          {
            title: "Data Structures and Algorithms with Python",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20Python/Data%20Structures%20and%20Algorithms%20with%20Python.pdf",
          },
          {
            title: "IMPORTANT DSA cheatsheet",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20Python/IMPORTANT%20DSA%20cheatsheet.pdf",
          },
          {
            title: "Learn DSA in 100 days",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20Python/Learn%20DSA%20in%20100%20days.pdf",
          },
          {
            title: "DSA cheatsheet 2",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20Python/dsa%20cheatsheet%20.pdf",
          },
        

      ] },
      { name: "DSA in Java", files: [
        {
            title: "Basic Data structures {IMPORTANT}",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20Java/Basic%20Data%20structures%20%7BIMPORTANT%7D.pdf",
          },
           {
            title: "Cheat_CODE_Book_By_GFG",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20Java/Cheat_CODE_Book_By_GFG.pdf",
          },

           {
            title: "Coding Interview Preparing",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20Java/Coding%20Interview%20Preparing.pdf",
          },

           {
            title: "Complete_DSA_Guide_ROADMAP",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20Java/Complete_DSA_Guide_ROADMAP.pdf",
          },
           {
            title: "DSA Notes" ,
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20Java/DAS%20Notes.pdf",
          },

           {
            title: "DATA STRUCTURE AND ALGORITHMS",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20Java/DATA%20STRUCTURE%20AND%20ALGORITHMS.pdf",
          },

           {
            title: "DSA CheatSheet",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20Java/DSA%20CheatSheet.pdf",
          },

           {
            title: "DSA Using Java Quick Guide ",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20Java/DSA%20Using%20Java%20Quick%20Guide%20%E2%9D%A4%EF%B8%8F.pdf",
          },

           {
            title: "Data Structures and Algorithms Made Easy in Java",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20Java/Data%20Structures%20and%20Algorithms%20Made%20Easy%20in%20Java%20-%20Narasimha%20Karumanchi-min.pdf",
          },

           {
            title: "FRAZ DSA Sheet Solutions",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20Java/FRAZ%20DSA%20Sheet%20Solutions%20by%20Prashant.pdf",
          },

           {
            title: "IMPORTANT DSA cheatsheet",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20Java/IMPORTANT%20DSA%20cheatsheet.pdf",
          },

           {
            title: "Java DSA",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20Java/Java%20Dsa.pdf",
          },

           {
            title: "Learn DSA in 100 days",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20Java/Learn%20DSA%20in%20100%20days.pdf",
          },

           {
            title: "Leetcode Interview Coding Solutions Sheet",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20Java/Leetcode%20Interview%20Coding%20Solutions%20Sheet.pdf",
          },

           {
            title: "DSA Cheatsheet 2",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/DSA%20in%20Java/dsa%20cheatsheet%20.pdf",
          },

      ] },
      { name: "Learning DSA Resources ", files: [
         {
            title: "Algorithms & Flowchart Manual",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Algorithms%20%26%20Flowchart%20Manual.pdf",
          },
           {
            title: "Complete DSA Handwritten Notes",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Complete%20DSA%20Handwritten%20Notes.pdf",
          },
           {
            title: "Cracking the Coding Interview",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Cracking%20the%20Coding%20Interview.pdf",
          },
           {
            title: "DSA Complete Interview Guide",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/DSA%20Complete%20Interview%20Guide.pdf",
          },
           {
            title: "Time Complexity of Algorithms",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Time%20Complexity%20of%20Algorithms.pdf",
          },
           {
            title: "Leetcode_s optimised usage by Bosscoder",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Leetcode_s%20optimised%20usage%20by%20Bosscoder.pdf",
          },
           {
            title: "Leetcode Interview Coding Solutions Sheet",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Leetcode%20Interview%20Coding%20Solutions%20Sheet.pdf",
          },
           
      ] },
      { name: "Practice Questions", files: [
        {
            title: "Algorithms and Problem Solving Tips",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Algorithms%20and%20Problem%20Solving%20Tips.pdf",
          },
          {
            title: "Dynamic Programming - LeetCode",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Dynamic%20Programming%20-%20LeetCode.pdf",
          },
          {
            title: "Dynamic Programming part-1",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Dynamic%20Programming%20part-1.pdf",
          },
          {
            title: "Dynamic Programming part-2",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Dynamic%20Programming%20part-2.pdf",
          },
          {
            title: "IMPORTANT DSA Problem List",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/IMPORTANT_DSA_Problem_List.pdf",
          },
          {
            title: "LeetCode_Most_Asked_Questions",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/LeetCode_Most_Asked_Questions.pdf",
          },
          {
            title: "LeetCode_TopicWise_Cheatsheet",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/LeetCode_TopicWise_Cheatsheet.pdf",
          },
          {
            title: "Leetcode Interview Coding Solutions Sheet",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Leetcode%20Interview%20Coding%20Solutions%20Sheet.pdf",
          },
          {
            title: "Most asked questions",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Most%20asked%20questions%20.pdf",
          },
          {
            title: "Stack and Queue",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Stack%20and%20Queue.pdf",
          },
          {
            title: "Top google question part-1",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Top%20google%20question%20part-1.pdf",
          },
          {
            title: "Top google question part-2",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Top%20google%20question%20part-2.pdf",
          },
      ] },
      { name: "Leetcode Company Wise", files: [
        {
            title: "Adobe - LeetCode",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Leet%20Code/Company%20Wise%20Leetcode/Adobe%20-%20LeetCode.pdf",
          },
           {
            title: "Adobe - Tagged LeetCode Problems",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Leet%20Code/Company%20Wise%20Leetcode/Adobe%20Tagged%20LeetCode%20Problems-1.pdf",
          },
           {
            title: "Amazon - LeetCode-1",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Leet%20Code/Company%20Wise%20Leetcode/Amazon%20-%20LeetCode-1.pdf",
          },
           {
            title: "Amazon DSA sheet",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Leet%20Code/Company%20Wise%20Leetcode/Amazon%20DSA%20sheet%20.pdf",
          },
           {
            title: "Amazon Part 2",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Leet%20Code/Company%20Wise%20Leetcode/Amazon%20Part%202.pdf",
          },
           {
            title: "Amazon Tagged LeetCode Problems",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Leet%20Code/Company%20Wise%20Leetcode/Amazon%20Tagged%20LeetCode%20Problems%20.pdf",
          },
           {
            title: "Amazon_6_months",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Leet%20Code/Company%20Wise%20Leetcode/Amazon_6_months.pdf",
          },
           {
            title: "Apple - LeetCode",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Leet%20Code/Company%20Wise%20Leetcode/Apple%20-%20LeetCode.pdf",
          },
           {
            title: "Walmart",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Leet%20Code/Company%20Wise%20Leetcode/Copy%20of%20Walmart%20Tagged%20LeetCode%20Problems.pdf",
          },
           {
            title: "Directi",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Leet%20Code/Company%20Wise%20Leetcode/Directi.pdf",
          },
           {
            title: "Expedia",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Leet%20Code/Company%20Wise%20Leetcode/Expedia%20-%20LeetCode.pdf",
          },
           {
            title: "Facebook",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Leet%20Code/Company%20Wise%20Leetcode/Facebook%20-%20LeetCode.pdf",
          },
           {
            title: "Facebook Tagged Leetcode Problems",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Leet%20Code/Company%20Wise%20Leetcode/Facebook%20Tagged%20LeetCode%20Problems.pdf",
          },
           {
            title: "Goldman Sachs",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Leet%20Code/Company%20Wise%20Leetcode/Goldman%20Sachs%20Tagged%20LeetCode%20Problems%20.pdf",
          },
           {
            title: "Google Interview Guide",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Leet%20Code/Company%20Wise%20Leetcode/Google%20Interview%20Guide.pdf",
          },
           {
            title: "Google Tagged Leetcode Problems",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Leet%20Code/Company%20Wise%20Leetcode/Google%20Tagged%20LeetCode%20Problems%20%20.pdf",
          },
           {
            title: "JP Morgan",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Leet%20Code/Company%20Wise%20Leetcode/JP%20Morgan%20Tagged%20LeetCode%20Problems.pdf",
          },
           {
            title: "Leetcode SQL",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Leet%20Code/Company%20Wise%20Leetcode/LeetCode%20SQL%20.pdf",
          },
           {
            title: "Linkedin",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Leet%20Code/Company%20Wise%20Leetcode/Linkedin%20Tagged%20LeetCode%20Problems.pdf",
          },
           {
            title: "Microsoft",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Leet%20Code/Company%20Wise%20Leetcode/Microsoft%20-%20LeetCode.pdf",
          },
           {
            title: "Microsoft Tagged Leetcode Problems",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Leet%20Code/Company%20Wise%20Leetcode/Microsoft%20Tagged%20LeetCode%20Problems.pdf",
          },
           {
            title: "Oracle",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Leet%20Code/Company%20Wise%20Leetcode/Oracle%20-%20DSA%20Interview%20Question%20with%20Solutions(1).pdf",
          },
           {
            title: "Oracle 2",
            url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dsa/Learning%20DSA%20Resources/Practice%20DSA/Leet%20Code/Company%20Wise%20Leetcode/Oracle%20-%20DSA%20Interview%20Question%20with%20Solutions.pdf",
          },

      ] },
    ],
  },

  dbms: {
    name: "DBMS",
    icon: <Database className="h-6 w-6 text-purple-600" />,
    subfolders: [
      { name: "Learning Material", files: [
        {title:"Complete SQL Cheatsheet",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/Complete%20SQL%20Cheatsheet%20.pdf",
        },
        {title:"DBMS & SQL Notes",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/DBMS%20%26%20SQL%20Notes.pdf",
        },
        {title:"DBMS Notes-2",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/DBMS%20Notes-2.pdf",
        },
        {title:"DataBase Quick Notes",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/DataBase%20Quick%20Notes%20.pdf",
        },
        {title:"Guide to Master SQL",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/Guide%20to%20Master%20SQL%20%F0%9F%93%92%F0%9F%94%A2%F0%9F%8E%AF%F0%9F%A7%91%E2%80%8D%F0%9F%92%BB.pdf",
        },
        {title:"Harvard Resume & Cover Letter",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/Harvard%20Resume%20%26%20Cover%20Letter%20%F0%9F%94%A5%F0%9F%94%A5.pdf",
        },
        {title:"Learn sql",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/Learn%20sql.pdf",
        },
        {title:"Learning SQL-1",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/Learning%20SQL-1.pdf",
        },
        {title:"LeetCode SQL",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/LeetCode%20SQL%20.pdf",
        },
        {title:"LeetCode SQL Questions with Solutions - Full",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/LeetCode%20SQL%20Questions%20with%20Solutions%20-%20Full.pdf",
        },
        {title:"MongoDB",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/MongoDB.pdf",
        },
        {title:"MySQL CheatSheet",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/MySQL%20CheatSheet%20%F0%9F%94%B5%F0%9F%9F%A2.pdf",
        },
        {title:"SQL Exclusive Notes",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/SQL%20Exclusive%20Notes.pdf",
        },
        {title:"SQL Joins",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/SQL%20Joins%20.pdf",
        },
        {title:"SQL NOTES Simplified",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/SQL%20NOTES%20Simplified.pdf",
        },
        {title:"SQL Notes",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/SQL%20Notes.pdf",
        },
        {title:"SQL Resources for Data Scientists",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/SQL%20Resources%20for%20Data%20Scientists.pdf",
        },
        {title:"SQL Short Notes part 3",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/SQL%20Short%20Notes%20part%203.pdf",
        },
        {title:"SQL Tutorial",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/SQL%20Tutorial.pdf",
        },
        {title:"SQL command with example ",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/SQL%20command%20with%20example%20.pdf",
        },
        {title:"SQL for Data Science Book",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/SQL%20for%20Data%20Science%20Book.pdf",
        },
        {title:"SQL guide",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/SQL%20guide.pdf",
        },
        {title:"SQLite",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/SQLite%20(%20PDFDrive%20).pdf",
        },
        {title:"Sqlite Tutorialspoint",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/Sqlite%20Tutorialspoint.pdf",
        },

      ] },
      { name: "DBMS Interview Questioons", files: [
        {title:"100 DBMS Interview Questions",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/DBMS%20Interview%20Questions/100%20DBMS%20Interview%20Questions%20.pdf",
        },
         {title:"DBMS Interview Questions",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/DBMS%20Interview%20Questions/DBMS%20Interview%20Questions.pdf",
        },
         {title:"DBMS Notes",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/DBMS%20Interview%20Questions/DBMS%20Notes%20.pdf",
        },
         {title:"DBMS TECHNICAL INTERVIEW QUESTIONS",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/DBMS%20Interview%20Questions/DBMS%20TECHNICAL%20INTERVIEW%20QUESTIONS%20.pdf",
        },
         {title:"MySQL CheatSheet",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/DBMS%20Interview%20Questions/MySQL%20CheatSheet.pdf",
        },
         {title:"SQL Interview Prep",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/DBMS%20Interview%20Questions/SQL%20Interview%20Prep.pdf",
        },
         {title:"SQL Interview Question guide",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/DBMS%20Interview%20Questions/SQL%20Interview%20Question%20guide.pdf",
        },
         {title:"SQL Interview Questions and Answers",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/DBMS%20Interview%20Questions/SQL%20Interview%20Questions%20and%20Answers%20.pdf",
        },
         {title:"SQL Notes",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/DBMS%20Interview%20Questions/SQL%20Notes.pdf",
        },
         {title:"SQL-interview Questions & Answers",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/DBMS%20Interview%20Questions/SQL-interview%20Questions%20%26%20Answers.pdf",
        },
         {title:"Top 50 SQL Interview Questions",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/DBMS%20Interview%20Questions/Top%2050%20SQL%20Interview%20Questions%20.pdf",
        },
         {title:"sql joins",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/dbms/DBMS/DBMS%20Interview%20Questions/sql%20joins.pdf",
        },

      ] },
    ],
  },
  "cloud-computing": {
    name: "Cloud Computing",
    icon: <CloudCog className="h-6 w-6 text-cyan-600" />,
    subfolders: [{ name: "Cloud Computing Resources", files: [
{title:"Cloud Computing ",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/Cloud%20Computing%20.pdf",
},
{title:"Cloud Computing Cheat Sheet",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/Cloud%20Computing%20Cheat%20Sheet.pdf",
},
{title:"Cloud Engineer Should Know",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/Cloud%20Engineer%20Should%20Know.pdf",
},
{title:"Docker Cheat Sheet",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/Docker%20Cheat%20Sheet%20.pdf",
},
{title:"Docker",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/Docker.pdf",
},
{title:"How does UPI work",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/How%20does%20UPI%20work_.pdf",
},
{title:"Introduction to APIs",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/Introduction%20to%20APIs.pdf",
},
{title:"Jenkins From Scratch",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/Jenkins%20From%20Scratch%20.pdf",
},
{title:"Jenkins Pipeline",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/Jenkins%20Pipeline%20.pdf",
},
{title:"Jenkins",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/Jenkins.pdf",
},
{title:"Kubernetes Cheat Sheet",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/Kubernetes%20Cheat%20Sheet%20.pdf",
},
{title:"Kubernetes for Microservice",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/Kubernetes%20for%20Microservice%20.pdf",
},
{title:"Kubernetes",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/Kubernetes.pdf",
},
{title:"Learning Docker",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/Learning%20Docker.pdf",
},
{title:"Microservices Notes",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/Microservices%20Notes%20-%20Thriver%20Ashish.pdf",
},
{title:"=Understanding The DOM",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/Understanding%20The%20DOM.pdf",
},
{title:"Unix Shell Scripting",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/Unix%20Shell%20Scripting.pdf",
},
{title:"Microservice Architectur",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/s%20Microservice%20Architecture%20%F0%9F%91%A8%F0%9F%8F%BB%E2%80%8D%F0%9F%92%BB.pdf",
},
{title:"Rest API",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/%F0%9F%94%BAREST%20API%F0%9F%94%BA%20HTTP%20%F0%9F%8C%90.pdf",
},
    ]},
{ name: "AWS", files: [
        {title:"AWS Cloud Economics Journey",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/AWS/AWS%20Cloud%20Economics%20Journey.pdf",
},
{title:"AWS Interview Questions & Answers(1)",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/AWS/AWS%20Interview%20Questions%20%26%20Answers(1).pdf",
},
{title:"AWS Interview Questions & Answers",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/AWS/AWS%20Interview%20Questions%20%26%20Answers.pdf",
},
{title:"AWS Security",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/AWS/AWS%20Security%20.pdf",
},
{title:"AWS Short Notes",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/AWS/AWS%20Short%20Notes.pdf",
},
{title:"Mastering AWS Security",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/AWS/Mastering%20AWS%20Security%20.pdf",
},
{title:"AWS Interview Notes",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/AWS/%F0%9D%98%BC%F0%9D%99%92%F0%9D%99%8E%20%F0%9D%99%84%F0%9D%99%A3%F0%9D%99%A9%F0%9D%99%9A%F0%9D%99%A7%F0%9D%99%AB%F0%9D%99%9E%F0%9D%99%9A%F0%9D%99%AC%20%F0%9D%99%89%F0%9D%99%A4%F0%9D%99%A9%F0%9D%99%9A%F0%9D%99%A8.pdf",
},
    ] },
    { name: "Google Cloud", files: [
        {title:"G Cloud in 10 Slides",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/Google%20Cloud/G%20Cloud%20in%2010%20Slides.pdf",
},
        {title:"GCP",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/Google%20Cloud/GCP.pdf",
},
        {title:"Introduction to Google Cloud",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/Google%20Cloud/Introduction%20to%20Google%20Cloud.pdf",
},
    ] },
{ name: "AZURE", files: [
        {title:"Azure Fundamentals AZ-900",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/Azure/Azure%20Fundamentals%20AZ-900.pdf",
},
{title:"LEARNING AZUREs",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cloud-computing/Cloud%20Computing%20Resources/Azure/LEARNING%20AZURE.pdf",
},
    ] }],
  },
  "CS Fundamentals": {
    name: "CS Fundamentals",
    icon: <Brain className="h-6 w-6 text-cyan-600" />,
    subfolders: [{ name: "Computer Networks", files: [
        {
            title:"CN roadmap",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/Computer%20Network/CN%20roadmap.docx",
        },
        {
            title:"Computer Network Notes for Placements and GATE",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/Computer%20Network/Computer%20Network%20Notes%20for%20Placements%20and%20GATE.pdf",
        },
        {
            title:"Networking Interview Questions",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/Computer%20Network/Networking%20Interview%20Questions.pdf",
        },
        {
            title:"networking-interview-questions",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/Computer%20Network/networking-interview-questions.pdf",
        },
        
    ] },
{ name: "OOPS", files: [
        {
            title:"OOPS Concepts in Java",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/OOPs/OOPS%20Concepts%20in%20Java%20PDF%20Download.pdf",
        },
        {
            title:"OOPs Interview Questions",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/OOPs/OOPs%20Interview%20Questions.pdf",
        },
        {
            title:"The-Principles-of-Object-Oriented-JavaScript",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/OOPs/The-Principles-of-Object-Oriented-JavaScript.pdf",
        },
        {
            title:"networking-interview-questions",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/OOPs/Python-OOP.pdf",
        },
        
    ] },

    {
        name:"Operating Systems",files:[
            {
                title:"OPERATING SYSTEM PART-1",
                url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/Operating%20System/OPERATING%20SYSTEM%20PART-1.pdf",
            },
            {
                title:"OPERATING SYSTEM PART-2",
                url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/Operating%20System/OPERATING%20SYSTEM%20PART-2.pdf",
            },
            {
                title:"OPERATING SYSTEM SHORT NOTES",
                url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/Operating%20System/OPERATING%20SYSTEM%20SHORT%20NOTES.pdf",
            },
            {
                title:"Operating System Interview Question",
                url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/Operating%20System/Operating%20System%20Interview%20Question.pdf",
            },
            {
                title:"Operating-System-Dr-Mamta-Bansal-Rajshree",
                url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/Operating%20System/Operating-System-Dr-Mamta-Bansal-Rajshree.pdf",
            },

        ]
    },
    {name:"Software Engineering", files:[
        {
            title:"SE Interview Questions",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/Software%20Engineering/SE%20Interview%20Questions.pdf",
        },
         {
            title:"Software Engineering",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/Software%20Engineering/Software%20Engineering.pdf",
        },
    ]

    },
    {name:"System Design", files:[
        {
            title:"System Design Cheatsheet",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/System%20Design/System%20Design%20Cheatsheet.pdf",
        },
         {
            title:"System design interview questions",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/System%20Design/System%20design%20interview%20questions.pdf",
        },
        {
            title:"System design notes",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/System%20Design/System%20design%20notes.pdf",
        }
    ]},
    {
        name:"DSA",files:[
            {
                title:"Complete Resources of DSA",
                url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/DSA/Complete%20Resources%20of%20DSA.pdf",
            },
            {
                title:"DSA Resource",
                url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/DSA/DSA%20Resource.pdf",
            },
            {
                title:"Top 50 DSA programming interview questions",
                url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/DSA/Top%2050%20DSA%20programming%20interview%20questions.docx",
            },
            {
                title:"striver sde sheet solution",
                url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/DSA/striver%20sde%20sheet%20solution.pdf",
            },
            {
                title:"DATA STRUCTURE and Algorithms Cheatsheet",
                url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/DSA/%E2%99%A6%EF%B8%8F%20DATA%20STRUCTURE%20and%20Algorithms%20Cheatsheet%20%E2%99%A6%EF%B8%8F.pdf",
            }
        ]
    },
    {
        name:"Helping Material", files:[
            {
                title:"25+ Job Interview Preparation Prompts",
                url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/25%2B%20Job%20Interview%20Preparation%20Prompts.docx",
            },
            {
                title:"Cover Letter Template",
                url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/Cover%20Letter%20Template.docx",
            },
            {
                title:"HR Interview Questions",
                url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/HR%20Interview%20Questions.pdf",
            },
            {
                title:"List of Companies hring freshers offcampus",
                url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/List%20of%20Companies%20hring%20freshers%20offcampus.docx",
            },
            {
                title:"Template+advice",
                url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/Template%2Badvice.docx",
            },
            {
                title:"leetcode problems",
                url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/cs-fundamentals/CS%20Fundamentals(Lets%20Code)/leetcode%20problems.pdf",
            },
        ]
    }

],
  },
  "Placement Papers": {
    name: "Placement Papers",
    icon: <Files className="h-6 w-6 text-cyan-600" />,
    subfolders: [{ name: "Company Wise Asked Questions", files: [
        {
            title:"Accenture paper",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/placement-papers/Placement%20%20paper%20(TCS%20%2C%20Wipro%20%2C%20Accenture%20etc)%20Lets%20Code/Accenture%20paper.pdf",
        },
        {
            title:"Accenture previous year paper",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/placement-papers/Placement%20%20paper%20(TCS%20%2C%20Wipro%20%2C%20Accenture%20etc)%20Lets%20Code/Accenture%20previous%20year%20paper.pdf",
        },
        {
            title:"Accenture",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/placement-papers/Placement%20%20paper%20(TCS%20%2C%20Wipro%20%2C%20Accenture%20etc)%20Lets%20Code/Accenture.docx",
        },
        {
            title:"Accenture 2",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/placement-papers/Placement%20%20paper%20(TCS%20%2C%20Wipro%20%2C%20Accenture%20etc)%20Lets%20Code/Accenture.pdf",
        },
        {
            title:"Accenturer On-Campus Placement material",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/placement-papers/Placement%20%20paper%20(TCS%20%2C%20Wipro%20%2C%20Accenture%20etc)%20Lets%20Code/Accenturer%20On-Campus%20Placement%20material.pdf",
        },
        {
            title:"Branch_wise_TCS_Questions_Tech_MR_HR_round",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/placement-papers/Placement%20%20paper%20(TCS%20%2C%20Wipro%20%2C%20Accenture%20etc)%20Lets%20Code/Branch_wise_TCS_Questions_Tech_MR_HR_round_by_seniors_of_2020_batch.pdf",
        },
        {
            title:"COGNIZANT ON-CAMPUS EXAM PAPER",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/placement-papers/Placement%20%20paper%20(TCS%20%2C%20Wipro%20%2C%20Accenture%20etc)%20Lets%20Code/COGNIZANT%20ON-CAMPUS%20EXAM%20PAPER%20%E2%80%93%2020th%20June%202021.pdf",
        },
        {
            title:"Cognizant Placement Paper",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/placement-papers/Placement%20%20paper%20(TCS%20%2C%20Wipro%20%2C%20Accenture%20etc)%20Lets%20Code/Cognizant%20Placement%20Paper.pdf",
        },
        {
            title:"Goldman Sachs Coding Round ",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/placement-papers/Placement%20%20paper%20(TCS%20%2C%20Wipro%20%2C%20Accenture%20etc)%20Lets%20Code/Goldman%20Sachs%20Coding%20Round%20-%2028th%20June%202021%20.pdf",
        },
        {
            title:"HCL Placement Material(1)",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/placement-papers/Placement%20%20paper%20(TCS%20%2C%20Wipro%20%2C%20Accenture%20etc)%20Lets%20Code/HCL%20Placement%20Material(1).pdf",
        },
        {
            title:"INFOSYS EXAM PAPER",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/placement-papers/Placement%20%20paper%20(TCS%20%2C%20Wipro%20%2C%20Accenture%20etc)%20Lets%20Code/INFOSYS%20EXAM%20PAPER%20-%2012th%20July%202021.pdf",
        },
        {
            title:"Infosys Placement Paper",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/placement-papers/Placement%20%20paper%20(TCS%20%2C%20Wipro%20%2C%20Accenture%20etc)%20Lets%20Code/Infosys%20Placement%20Paper.pdf",
        },
        {
            title:"Lets Code",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/placement-papers/Placement%20%20paper%20(TCS%20%2C%20Wipro%20%2C%20Accenture%20etc)%20Lets%20Code/Lets%20Code.docx",
        },
        {
            title:"Most Asked DBMS Interview Qns & Ans",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/placement-papers/Placement%20%20paper%20(TCS%20%2C%20Wipro%20%2C%20Accenture%20etc)%20Lets%20Code/Most%20Asked%20DBMS%20Interview%20Qns%20%26%20Ans.pdf",
        },
        {
            title:"OOPs Concept Technical Round CheatBook",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/placement-papers/Placement%20%20paper%20(TCS%20%2C%20Wipro%20%2C%20Accenture%20etc)%20Lets%20Code/OOPs%20Concept%20Technical%20Round%20CheatBook.pdf",
        },
        {
            title:"QUANT SHORTCUTS 101 question",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/placement-papers/Placement%20%20paper%20(TCS%20%2C%20Wipro%20%2C%20Accenture%20etc)%20Lets%20Code/QUANT%20SHORTCUTS%20101%20question.pdf",
        },
        {
            title:"SAP Model Question Paper",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/placement-papers/Placement%20%20paper%20(TCS%20%2C%20Wipro%20%2C%20Accenture%20etc)%20Lets%20Code/SAP%20Model%20Question%20Paper.pdf",
        },
        {
            title:"TCS",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/placement-papers/Placement%20%20paper%20(TCS%20%2C%20Wipro%20%2C%20Accenture%20etc)%20Lets%20Code/TCS%20Digital%20Solved%20-%207th%20August%20Slot.pdf",
        },
        {
            title:"TCS Digital Solved Question Paper",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/placement-papers/Placement%20%20paper%20(TCS%20%2C%20Wipro%20%2C%20Accenture%20etc)%20Lets%20Code/TCS%20Digital%20Solved%20Question%20Paper.pdf",
        },
        {
            title:"TCS NQT Solved Paper",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/placement-papers/Placement%20%20paper%20(TCS%20%2C%20Wipro%20%2C%20Accenture%20etc)%20Lets%20Code/TCS%20NQT%20Solved%20Paper%20-%2012th%20Sept%202021%20%5BMorning%20Slot%5D.pdf",
        },
        {
            title:"TCS NQT Solved Paper - 13th Sept",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/placement-papers/Placement%20%20paper%20(TCS%20%2C%20Wipro%20%2C%20Accenture%20etc)%20Lets%20Code/TCS%20NQT%20Solved%20Paper%20-%2013th%20Sept%202021%20%5BSlot%201%5D.pdf",
        },
        {
            title:"Top 100 Java Interview Qns & Ans",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/placement-papers/Placement%20%20paper%20(TCS%20%2C%20Wipro%20%2C%20Accenture%20etc)%20Lets%20Code/Top%20100%20Java%20Interview%20Qns%20%26%20Ans.pdf",
        },
        {
            title:"Top 30 HR Round Questions and Perfect Answers",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/placement-papers/Placement%20%20paper%20(TCS%20%2C%20Wipro%20%2C%20Accenture%20etc)%20Lets%20Code/Top%2030%20HR%20Round%20Questions%20and%20Perfect%20Answers.pdf",
        },
        {
            title:"WIPRO NLTH CODING ANSWERS 1",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/placement-papers/Placement%20%20paper%20(TCS%20%2C%20Wipro%20%2C%20Accenture%20etc)%20Lets%20Code/WIPRO%20NLTH%20CODING%20ANSWERS%20%E2%80%93%2029TH%20JAN%20AFTERNOON%20SLOT.pdf",
        },
        {
            title:"WIPRO NLTH CODING ANSWERS 2",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/placement-papers/Placement%20%20paper%20(TCS%20%2C%20Wipro%20%2C%20Accenture%20etc)%20Lets%20Code/WIPRO%20NLTH%20CODING%20ANSWERS%20%E2%80%93%2029TH%20JAN%20MORNING%20SLOT.pdf",
        },
        {
            title:"Wipro NLTH All Coding Answers",
            url:"https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/placement-papers/Placement%20%20paper%20(TCS%20%2C%20Wipro%20%2C%20Accenture%20etc)%20Lets%20Code/Wipro%20NLTH%20All%20Coding%20Answers%2029th%20Jan.pdf",
        },
]},
],
  },
  "Placement": {
    name: "Placement",
    icon: <Target className="h-6 w-6 text-cyan-600" />,
    subfolders: [{ name: "Comming Soon", files: [
        {
            title:"Accenture paper",
            url:"xxxxx",
        },
    ],},
]},
};


/* ================= HELPERS ================= */

const slug = (s: string) =>
  s.toLowerCase().replace(/\s+/g, "-");

/* ================= COMPONENT ================= */

export default function StudyMaterials() {

  const [params, setParams] = useSearchParams();
  const navigate =useNavigate();
  const BackButton = () => (
  <button
    onClick={() => navigate(-1)}
    className="fixed top-2 left-4 z-[9999] bg-transparent border border-gray-200 px-2 py-1 rounded-xl hover:bg-gray-100"
  >
    ← Back
  </button>
);

  const folderKey = params.get("folder");
  const subKey = params.get("sub");
  const fileIndex = params.get("file");

  const folder = folderKey ? DATA[folderKey] : null;
  const subfolder =
    folder && subKey
      ? folder.subfolders.find(
          (s) => slug(s.name) === subKey
        )
      : null;

  /* ================= FILE READER ================= */

  if (folder && subfolder && fileIndex !== null) {
    const file = subfolder.files[Number(fileIndex)];

    return (
      <div className="fixed inset-0 z-[9999] bg-slate-100 flex flex-col">
        <div className="h-14 bg-white border-b flex items-center justify-between px-6">
          <button
            onClick={() => {
              const next = new URLSearchParams(params);
              next.delete("file");
              setParams(next);
            }}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="font-semibold truncate">
            {file.title}
          </div>

          <a
            href={file.url}
            download
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700"
          >
            <Download className="h-4 w-4" />
            Download
          </a>
        </div>

        <div className="flex-1 bg-gray-200">
          <embed
            src={file.url}
            type="application/pdf"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    );
  }

  /* ================= FILE LIST ================= */

  if (folder && subfolder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white-1000 to-white-1000 px-10 py-8">
        <BackButton />
        <h1 className="text-2xl font-bold mb-8 mt-8 flex items-center gap-3">
          <FolderOpen className="h-5 w-6 text-indigo-600" />
          {subfolder.name}
        </h1>

        <div className="space-y-4 max-w-8xl">
          {subfolder.files.map((file, idx) => (
            <div
              key={file.title}
              className="bg-white rounded-xl border p-6 flex justify-between items-center hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                <FileText className="h-6 w-6 text-red-500" />
                <div>
                  <div className="font-medium text-lg">
                    {file.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    PDF Document
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    setParams({
                      folder: folderKey!,
                      sub: subKey!,
                      file: String(idx),
                    })
                  }
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
                >
                  Read
                </button>

                <a
                  href={file.url}
                  download
                  className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ================= SUBFOLDERS ================= */

  if (folder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white-1000 to-white-1000 px-10 py-10">
        <BackButton />
        <h1 className="text-2xl font-bold mb-8 mt-8 flex items-center gap-3">
          {folder.icon}
          {folder.name}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {folder.subfolders.map((subf) => (
            <div
              key={subf.name}
              onClick={() =>
                setParams({
                  folder: folderKey!,
                  sub: slug(subf.name),
                })
              }
              className="bg-white rounded-2xl p-8 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <Folder className="h-8 w-8 text-indigo-500 mb-4" />
              <div className="text-lg font-semibold">
                {subf.name}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {subf.files.length} resources
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ================= ROOT FOLDERS ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-1000 to-white-1000 px-10 py-12">
      <BackButton/>
      
      <h1 className="text-3xl font-bold mb-8 mt-8">
        📚 Study Materials
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {Object.entries(DATA).map(([key, folder]) => (
          <div
            key={key}
            onClick={() => setParams({ folder: key })}
            className="bg-white rounded-3xl p-10 cursor-pointer shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <div className="mb-6">{folder.icon}</div>
            <div className="text-xl font-semibold">
              {folder.name}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              {folder.subfolders.length} sections
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
