/** Object.keys를 대체하는 util함수 */
export function getKeysOfObject<T extends Record<string, any>>(
  obj: T,
): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}

/** fetch함수 */
export const safeAwait = async <T>(
  promise: Promise<T>,
): Promise<[T | null, Error | null]> => {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error instanceof Error ? error : new Error(String(error))];
  }
};

export const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  // month 이름 배열
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // 날짜 구성
  const month = months[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  // 결과 조합
  const formatted = `${month} ${day}, ${year}`;
  return formatted;
};

export function objToQueryStr<T extends object>(objQuery: T): string {
  const stringQuery = Object.entries(objQuery)
    .filter(
      ([_, value]) => value !== undefined && value !== null && value !== "",
    )
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value
          .filter((v) => v !== undefined && v !== null && v !== "") // 배열 내의 유효한 값만 필터링
          .map((v) => `${key}=${v}`)
          .join("&");
      }
      // 단일 값인 경우, 쿼리 스트링 생성
      return `${key}=${value}`;
    })
    .join("&");
  return stringQuery;
}
