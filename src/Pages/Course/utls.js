/**
 * isLessonUnlocl - a method that check whatever if a lesson can be played
 * @param {object} lesson 
 * @param {Array} lessons 
 * @returns true if the lessons is unlock false if not
 */
export function isLesonUnlock (lesson, lessons) {
	const index = lessons.indexOf(lesson)	
    const prev_percent = index !== 0 ? lessons[index -1].progress_percent || 0 : 1;

   return (prev_percent === 1? true : false)
}