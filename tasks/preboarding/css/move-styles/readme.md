Writing styles in tags is fast, but if there are many styles, it will be very difficult to understand such code. Therefore, let's not wait for problems to appear, but immediately transfer all styles to a separate `style.css` file.

**Requirements for the task:**
- All styles should be transferred to `style.css` file
- Font color and size should be set for the entire `description` block, not for each individual paragraph.

**Example:**

index.html **to**:
```
<!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Mentoring of Oleh Kozak</title>
  </head>
  <body>
      <h1 style="font-size: 8px;">Heading Title</h1>
  </body>
</html>
```

index.html **after**:
```
<!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Mentoring of Oleh Kozak</title>
      <link rel="stylesheet" href="style.css">
  </head>
  <body>
      <h1>Heading Title</h1>
  </body>
</html>
```

style.css:
```
h1 {
    font-size: 8px;
}
```

---

Писати стилі в тегах - це швидко, але якщо стилей буде багато, то розібратися в такому коді буде дуже складно. Тому давай не будемо чекати на появу проблем, а одразу перенесемо усі стилі в окремий файл `style.css`.

**Вимоги до завдання:**
- Всі стилі мають бути перенесенні у файл `style.css`
- Колір і розмір шрифту мають бути задані для всього блоку `description`, а не для кожного окремого абзацу.

**Приклад:**

index.html **до**:
```
<!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Mentoring of Oleh Kozak</title>
  </head>
  <body>
      <h1 style="font-size: 8px;">Heading Title</h1>
  </body>
</html>
```

index.html **після**:
```
<!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Mentoring of Oleh Kozak</title>
      <link rel="stylesheet" href="style.css">
  </head>
  <body>
      <h1>Heading Title</h1>
  </body>
</html>
```

style.css:
```
h1 {
    font-size: 8px;
}
```