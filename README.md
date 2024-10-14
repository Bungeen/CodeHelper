> Куликов Михаил Юрьевич M3100
# CodeHelper
This extension can improve your productivity of writing CPP code
## Features
- New navigation on the page using the up and down arrows
-- Now the cursor will be in the center of the screen all the time, and the position of the page will shift.
- New snippets satisfying [Google CodeStyle](https://google.github.io/styleguide/cppguide.html)
> ```
> ifexit
>```
> ```cpp
>    if (true) {
>        /* code */
>        return /* n */;
>    }
> ```

> ```
> plusL
>```
> ```cpp
>    for (size_t i = count; i >= 0; ++i) {
>        /* code */
>    }
> ```

> ```
> minusL
>```
> ```cpp
>    for (size_t i = count; i >= 0; --i) {
>        /* code */
>    }
> ```

- Quick code removal to a separate function
- - Select the code snippet
- - Press **Ctrl+Shift+Q**
- - Enter the **name** of the future function (required field)
- - Enter the **data type** of the function (required field)
- - Enter the **arguments** of the function (optional field)
The selected fragment will be replaced with an example of a function call, and the created function will be in the clipboard 
```cpp
// Was
#include <iostream>

int main()
{
    int a, b, k;
    int ans = a;
    for (int i = 0; i < k; ++i) {
        ans = ans + b;
    }
}
```
```cpp
// Became after paste
#include <iostream>

int Sum(int a, int b, int c) {
	int a, b, k;
	int ans = a;
	for (int i = 0; i < k; ++i) {
	ans = ans + b;
	}

 	return int();
}

int main()
{
    int result = Sum(/*--Args--*/);
}
```

## Requirements
- C/C++ (ms-vscode.cpptools)
- C/C++ Extension Pack (ms-vscode.cpptools-extension-pack)


## Release Notes
### 0.0.1
Initial release of beta-version CodeHelper

### 0.0.2
Fixed bug with ';' before function call for void
