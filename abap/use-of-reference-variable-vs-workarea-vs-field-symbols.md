Source: http://zevolving.com/2014/03/use-of-reference-variable-vs-workarea-vs-field-symbols/


```abap

REPORT  ztest_np_loop_reference.
 
*
DATA: i_bseg TYPE STANDARD TABLE OF bseg,
      wa_bseg LIKE LINE OF i_bseg.
*
DATA: lv_flag TYPE flag,
      lv_sta_time TYPE timestampl,
      lv_end_time TYPE timestampl,
      lv_diff_w   TYPE p DECIMALS 5,
      lv_diff_f   LIKE lv_diff_w,
      lv_diff_r   LIKE lv_diff_w,
      lv_save     LIKE lv_diff_w.
*
FIELD-SYMBOLS: <fs_bseg> LIKE LINE OF i_bseg.
 
DATA: o_bseg TYPE REF TO bseg.
*
* data selection = 10,000 records
SELECT * FROM bseg INTO TABLE i_bseg UP TO 100 ROWS.
*
* Begin - Processing with Work area
GET TIME STAMP FIELD lv_sta_time.
LOOP AT i_bseg INTO wa_bseg.
  IF lv_flag = 'X'.
    wa_bseg-sgtxt = 'TEST'.
    MODIFY i_bseg FROM wa_bseg.
  ENDIF.
  CLEAR wa_bseg.
  IF lv_flag IS INITIAL.
    lv_flag = 'X'.
  ENDIF.
ENDLOOP.
GET TIME STAMP FIELD lv_end_time.
lv_diff_w = lv_end_time - lv_sta_time.
WRITE: /(30) 'Work area', lv_diff_w.
* End   - Processing with Work Area
*
CLEAR: lv_flag,
       lv_sta_time,
       lv_end_time.
* Begin - Processing with Field-Symbols
GET TIME STAMP FIELD lv_sta_time.
LOOP AT i_bseg ASSIGNING <fs_bseg>.
  IF lv_flag = 'X'.
    <fs_bseg>-sgtxt = 'TEST'.
  ENDIF.
  IF lv_flag IS INITIAL.
    lv_flag = 'X'.
  ENDIF.
ENDLOOP.
GET TIME STAMP FIELD lv_end_time.
lv_diff_f = lv_end_time - lv_sta_time.
WRITE: /(30) 'Field-Symbol', lv_diff_f.
* End   - Processing with FS
*
* Net time saving
lv_save = lv_diff_w - lv_diff_f.
WRITE: /(30) 'Total Save (FS-WA)', lv_save.
*
CLEAR: lv_flag,
       lv_sta_time,
       lv_end_time.
* Begin - Processing with Field-Symbols
GET TIME STAMP FIELD lv_sta_time.
LOOP AT i_bseg REFERENCE INTO o_bseg.
  IF lv_flag = 'X'.
    o_bseg->sgtxt = 'TEST'.
  ENDIF.
  IF lv_flag IS INITIAL.
    lv_flag = 'X'.
  ENDIF.
ENDLOOP.
GET TIME STAMP FIELD lv_end_time.
lv_diff_r = lv_end_time - lv_sta_time.
WRITE: /(30) 'Reference', lv_diff_r.
* End   - Processing with FS
*
* Net time saving
lv_save = lv_diff_f - lv_diff_r.
WRITE: /(30) 'Total Save(Ref-FS)', lv_save.
 
WRITE: / 'Done'.

```
The result:

| Records | Workarea | Field-Symbol | Reference |
|----:|----:|----:|----:|
| 100 | 100 | 17.50 | 23.75 |
| 1000 | 100 | 20.11 | 21.52 |
| 10000 | 100 | 19.97 | 23.77 |

