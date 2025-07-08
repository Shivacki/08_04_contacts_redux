// JSON-утилиты

// Загружает JSON-файл по сети или из локального файла
export async function loadJSON(path: string) {
  try {
    const response = await fetch(path);
    if (!response.ok)
      throw new Error('Сетевой ответ при загрузке JSON некорректен');
    return await response.json();
  } catch (error) {
    throw new Error('Ошибка при загрузке JSON: '+ (error as Error).message, );
  }
}

